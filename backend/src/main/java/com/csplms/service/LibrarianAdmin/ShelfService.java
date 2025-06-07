package com.csplms.service.LibrarianAdmin;

import com.csplms.dto.requestDto.ShelfRequestDto;
import com.csplms.dto.responseDto.AdminShelfDto;
import com.csplms.dto.responseDto.ShelfDto;
import com.csplms.dto.responseDto.ShelfResponseDto;
import com.csplms.entity.Book;
import com.csplms.entity.Shelf;
import com.csplms.entity.User;
import com.csplms.exception.ResourceListNotFoundException;
import com.csplms.exception.ResourceEntityNotFoundException;
import com.csplms.exception.UniqueKeyViolationException;
import com.csplms.mapper.ShelfMapper;
import com.csplms.repository.BookRepository;
import com.csplms.repository.ShelfRepository;
import com.csplms.repository.UserRepository;
import com.csplms.util.GetAuthUserUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class ShelfService {

    private static final Logger logger = LoggerFactory.getLogger(ShelfService.class);
    private final ShelfRepository shelfRepository;
    private final ShelfMapper shelfMapper;
    private final BookRepository bookRepository;
    private final GetAuthUserUtil getAuthUserUtil;
    private final UserRepository userRepository;

    @Autowired
    public ShelfService(ShelfRepository shelfRepository, ShelfMapper shelfMapper, BookRepository bookRepository, GetAuthUserUtil getAuthUserUtil, UserRepository userRepository) {
        this.shelfRepository = shelfRepository;
        this.shelfMapper = shelfMapper;
        this.bookRepository = bookRepository;
        this.getAuthUserUtil = getAuthUserUtil;
        this.userRepository = userRepository;
    }

    @Transactional
    public ShelfResponseDto addShelf(ShelfRequestDto shelfRequestDTO) {
        Shelf shelf;
        try {
//            Get the staff email
            String currentUser = getAuthUserUtil.getAuthUser();

//            Get the staff full object
            User user = userRepository.findUserByEmail(currentUser).orElseThrow(() -> new ResourceEntityNotFoundException("User", "Id", 0));

            shelf = shelfMapper.toShelf(shelfRequestDTO, user);
            shelf = shelfRepository.save(shelf);
            return shelfMapper.toShelfResponseDto(shelf);
        } catch (Exception ex) {
            if (ex instanceof DataIntegrityViolationException dive && dive.getRootCause().toString().contains("uk_shelf_name")) {
                throw new UniqueKeyViolationException("Name already used: "+ shelfRequestDTO.name());
            }
            throw ex;
        }
    }

    @Transactional
    public Shelf updateShelf(int shelfId, ShelfRequestDto shelfRequestDTO) {
        Shelf shelf = this.shelfRepository.findById(shelfId).orElseThrow(() -> new ResourceEntityNotFoundException("Shelf", "Id", shelfId));
        if(!shelf.isPresent()){
            throw new ResourceEntityNotFoundException("Shelf", "Id", shelfId);
        }

        try {
            Shelf savedShelf = shelfRepository.save(shelfMapper.toUpdateShelf(shelfRequestDTO, shelf));
            shelfRepository.flush();
            return savedShelf;

        } catch (Exception ex) {
            if (ex instanceof DataIntegrityViolationException dive
                    && dive.getCause().toString().contains("uk_shelf_name")) {
                throw new UniqueKeyViolationException("Name already used");
            }
            throw ex;
        }
    }

    @Transactional
    public Integer restoreShelf(int shelfId) {
        Shelf shelf = this.shelfRepository.findById(shelfId).orElseThrow(() -> new ResourceEntityNotFoundException("Shelf", "Id", shelfId));
        List<Book> booksOnShelf = bookRepository.selectAllRestoreShelfBooksByShelfId(shelf.getShelfId());
        if(!booksOnShelf.isEmpty()){
            for (Book book : booksOnShelf) {
                book.setAvailable(true);
                bookRepository.save(book);
                bookRepository.flush();
            }
        }
        shelf.setPresent(true);
        shelfRepository.save(shelf);
        shelfRepository.flush();
        return 1;
    }

    public ShelfDto getShelf(int shelfId) {
        Shelf shelf = this.shelfRepository.findById(shelfId).orElseThrow(() -> new ResourceEntityNotFoundException("Shelf", "Id", shelfId));

        if (shelf != null) {
            return new ShelfDto(
                    shelf.getShelfId(),
                    shelf.getName(),
                    shelf.getAddedDate(),
                    shelf.getAvailableCapacity(),
                    shelf.getTotalCapacity(),
                    shelf.getDescription(),
                    shelf.isPresent(),

                    shelf.getCategory() != null ? shelf.getCategory().getCategoryId() : null,
                    shelf.getCategory() != null ? shelf.getCategory().getName() : null
            );
        }
        return null;
    }

    public List<AdminShelfDto> getShelves() {
        List<Shelf> shelves =  this.shelfRepository.getAllShelves();
        if (shelves.isEmpty()){
            throw new ResourceListNotFoundException("Shelfs");
        }

        List<AdminShelfDto> shelfDtoList = new ArrayList<>();
        for (Shelf shelf : shelves){
            AdminShelfDto item = new AdminShelfDto(
                    shelf.getShelfId(),
                    shelf.getName(),
                    shelf.getAddedDate(),
                    shelf.getAvailableCapacity(),
                    shelf.getTotalCapacity(),
                    shelf.isPresent(),

                    shelf.getCategory() != null ? shelf.getCategory().getCategoryId() : null,
                    shelf.getCategory() != null ? shelf.getCategory().getName() : null
            );
            shelfDtoList.add(item);
        }

        return shelfDtoList;
    }

//    get all active shelves
    public List<ShelfDto> getAllAvailableShelves() {
        List<Shelf> shelves =  this.shelfRepository.getAllAvailableShelves();
        if (shelves.isEmpty()){
            throw new ResourceListNotFoundException("Shelfs");
        }

        List<ShelfDto> dtoList = new ArrayList<>();
        for (Shelf shelf : shelves){
            ShelfDto item = new ShelfDto(
                    shelf.getShelfId(),
                    shelf.getName(),
                    shelf.getAddedDate(),
                    shelf.getAvailableCapacity(),
                    shelf.getTotalCapacity(),
                    shelf.getDescription(),
                    shelf.isPresent(),
                    shelf.getCategory() != null ? shelf.getCategory().getCategoryId() : null,
                    shelf.getCategory() != null ? shelf.getCategory().getName() : null
            );
            dtoList.add(item);
        }

        return dtoList;
    }

    @Transactional
    public Integer deleteShelf(Integer shelfId) {
        Shelf shelf = this.shelfRepository.findById(shelfId).orElseThrow(() -> new ResourceEntityNotFoundException("Shelf", "Id", shelfId));
        if(!shelf.isPresent()){
            throw new ResourceEntityNotFoundException("Shelf", "id", shelfId);
        }

        List<Book> booksOnShelf = bookRepository.selectAllDeleteShelfBooksByShelfId(shelf.getShelfId());
        if (!booksOnShelf.isEmpty()) {
            for (Book book : booksOnShelf) {
                book.setAvailable(false);
                bookRepository.save(book);
                bookRepository.flush();
            }
        }
        shelf.setPresent(false);
        this.shelfRepository.save(shelf);
        shelfRepository.flush();
        return 1;
    }

}
