package com.csplms.mapper;

import com.csplms.entity.Book;
import com.csplms.dto.requestDto.BookRequestDto;
import com.csplms.dto.responseDto.BookResponseDto;
import com.csplms.entity.Category;
import com.csplms.entity.Shelf;
import com.csplms.entity.User;
import com.csplms.exception.ResourceAlreadyExistsException;
import com.csplms.exception.ResourceEntityNotFoundException;
import com.csplms.repository.CategoryRepository;
import com.csplms.repository.ShelfRepository;
import com.csplms.util.GlobalDateUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class BookMapper {

    private static final Logger logger = LoggerFactory.getLogger(BookMapper.class);
    private final CategoryRepository categoryRepository;
    private final GlobalDateUtil globalDateUtil;
    private final ShelfRepository shelfRepository;

    @Autowired
    public BookMapper(CategoryRepository categoryRepository, GlobalDateUtil globalDateUtil, ShelfRepository shelfRepository) {
        this.categoryRepository = categoryRepository;
        this.globalDateUtil = globalDateUtil;
        this.shelfRepository = shelfRepository;
    }

//    For add book
    public Book toBook(BookRequestDto bookRequestDto, User user) {
            Category category = categoryRepository.findById(bookRequestDto.categoryId()).orElseThrow(() -> new ResourceEntityNotFoundException("Shelf ", "Id", bookRequestDto.categoryId()));
            Shelf shelf = shelfRepository.findById(bookRequestDto.shelfId()).orElseThrow(() -> new ResourceEntityNotFoundException("Shelf", "Id", bookRequestDto.shelfId()));
            if(!category.isPresent()){
                throw new ResourceEntityNotFoundException("Category ", "Id", bookRequestDto.categoryId());
            }

            if(!shelf.isPresent()){
                throw new ResourceEntityNotFoundException("Shelf ", "Id", bookRequestDto.shelfId());
            }

            if (bookRequestDto.quantity() > shelf.getAvailableCapacity()){
                throw new ResourceAlreadyExistsException("Insufficient shelf capacity. Try selecting another one.");
            } else {
               shelf.setAvailableCapacity(shelf.getAvailableCapacity() - bookRequestDto.quantity());
               shelfRepository.save(shelf);
               shelfRepository.flush();
            }

            return new Book(
                    bookRequestDto.isbn(),
                    bookRequestDto.title(),
                    bookRequestDto.author(),
                    bookRequestDto.language(),
                    bookRequestDto.edition(),
                    bookRequestDto.pageCount(),
                    bookRequestDto.quantity(),
                    bookRequestDto.quantity(),
                    bookRequestDto.publishedDate(),
                    bookRequestDto.price(),
                    null,
                    bookRequestDto.description(),
                    globalDateUtil.getCurrentDate(),
                    true,
                    category,
                    shelf,
                    user
            );
    }

//    For add, update, restore book
    public BookResponseDto toBookResponseDto(Book book) {
        return new BookResponseDto(
                book.getBookId(),
                book.getIsbn(),
                book.getTitle(),
                book.getAuthor(),
                book.getLanguage(),
                book.getEdition(),
                book.getPageCount(),
                book.getTotalQuantity(),
                book.getPublishedDate(),
                book.getPrice(),
                book.getImageURL(),
                book.getDescription(),
                book.getAddedDate(),
                book.getPublishedDate(),
                book.isAvailable(),
                book.getCategory().getCategoryId()
        );
    }
}