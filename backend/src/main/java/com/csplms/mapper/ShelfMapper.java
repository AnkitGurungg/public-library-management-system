package com.csplms.mapper;

import com.csplms.entity.User;
import org.slf4j.Logger;
import com.csplms.entity.Book;
import com.csplms.entity.Shelf;
import org.slf4j.LoggerFactory;
import com.csplms.entity.Category;
import com.csplms.util.GlobalDateUtil;
import com.csplms.repository.BookRepository;
import org.springframework.stereotype.Component;
import com.csplms.repository.CategoryRepository;
import com.csplms.exception.UpdateShelfException;
import com.csplms.dto.requestDto.ShelfRequestDto;
import com.csplms.dto.responseDto.ShelfResponseDto;
import com.csplms.exception.ResourceEntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

@Component
public class ShelfMapper {

    private static final Logger logger = LoggerFactory.getLogger(ShelfMapper.class);
    private final CategoryRepository categoryRepository;
    private final GlobalDateUtil globalDateUtil;
    private final BookRepository bookRepository;

    @Autowired
    public ShelfMapper(CategoryRepository categoryRepository, GlobalDateUtil globalDateUtil, BookRepository bookRepository) {
        this.categoryRepository = categoryRepository;
        this.globalDateUtil = globalDateUtil;
        this.bookRepository = bookRepository;
    }

//    For add shelf
    public Shelf toShelf(ShelfRequestDto shelfRequestDto, User user) {
        Category category = this.categoryRepository.findById(shelfRequestDto.categoryId()).orElseThrow(() -> new ResourceEntityNotFoundException("Category", "id", shelfRequestDto.categoryId()));
        if(!category.isPresent()){
            throw new ResourceEntityNotFoundException("Category", "Id", shelfRequestDto.categoryId());
        }

        return new Shelf(
            shelfRequestDto.name(),
            shelfRequestDto.capacity(),
            shelfRequestDto.capacity(),
            globalDateUtil.getCurrentDate(),
            shelfRequestDto.description(),
            true,
            category,
            user
        );
    }

//    For update shelf
    public Shelf toUpdateShelf(ShelfRequestDto shelfRequestDto, Shelf shelf) {
        Category category = this.categoryRepository.findById(shelfRequestDto.categoryId()).orElseThrow(() -> new ResourceEntityNotFoundException("Category", "id", shelfRequestDto.categoryId()));
        if(!category.isPresent()){
            throw new ResourceEntityNotFoundException("Category", "Id", shelfRequestDto.categoryId());
        }

//        Get all books on the shelf
        List<Book> booksOnShelf = bookRepository.selectAllDeleteShelfBooksByShelfId(shelf.getShelfId());
        logger.info("Books on the shelf are: {}", booksOnShelf.size());

//        Calculate quantity of books on that shelf
        int quantityOfBooksOnShelf = 0;
        for (Book book : booksOnShelf) {
            quantityOfBooksOnShelf += book.getTotalQuantity();
        }
        
        if (shelfRequestDto.capacity() < quantityOfBooksOnShelf) {
            throw new UpdateShelfException("Shelf already contains quantity of books greater than requested capacity");
        }

        int quantityDifference = shelfRequestDto.capacity() - quantityOfBooksOnShelf;

        shelf.setName(shelfRequestDto.name());
        shelf.setAvailableCapacity(quantityDifference);
        shelf.setTotalCapacity(shelfRequestDto.capacity());
        shelf.setCategory(category);
        shelf.setDescription(shelfRequestDto.description());
        return shelf;
    }

//    For add shelf response
    public ShelfResponseDto toShelfResponseDto(Shelf shelf) {
        return new ShelfResponseDto(
            shelf.getShelfId(),
            shelf.getName(),
            shelf.getTotalCapacity(),
            shelf.getAddedDate(),
            shelf.getDescription(),
            shelf.isPresent(),
            shelf.getCategory().getCategoryId()
        );
    }
}