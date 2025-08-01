package com.csplms.service;

import com.csplms.dto.responseDto.BookResponseDto;
import com.csplms.dto.responseDto.GlobalBookSearchDto;
import com.csplms.entity.Book;
import com.csplms.entity.Borrow;
import com.csplms.repository.BookRepository;
import com.csplms.repository.BorrowRepository;
import com.csplms.repository.CategoryRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import com.csplms.exception.ResourceListNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.List;

@Service
public class DisplayResourcesServiceImpl implements DisplayResourcesService {

    private final CategoryRepository categoryRepository;
    private final BookRepository bookRepository;
    private final BorrowRepository borrowRepository;

    @Autowired
    public DisplayResourcesServiceImpl(CategoryRepository categoryRepository, BookRepository bookRepository, BorrowRepository borrowRepository) {
        this.categoryRepository = categoryRepository;
        this.bookRepository = bookRepository;
        this.borrowRepository = borrowRepository;
    }

    @Override
    public List<BookResponseDto> getFilteredBooksByCategory(Integer categoryId) {
        List<Book> filteredBooks = bookRepository.getFilteredBooksByCategory(categoryId);
        if (filteredBooks.isEmpty()){
            throw new ResourceListNotFoundException("Books");
        }

        List<BookResponseDto> dtoList = new ArrayList<>();
        for (Book book : filteredBooks) {
            BookResponseDto item = new BookResponseDto(
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
            dtoList.add(item);
        }

        return dtoList;
    }


    @Override
    public List<GlobalBookSearchDto> getAllAvailableBooks() {
        List<Book> bookList = this.bookRepository.getAllAvailableBooks();
        if(bookList.isEmpty()){
            throw new ResourceListNotFoundException("Books");
        }

        List<GlobalBookSearchDto> list = new ArrayList<>();
        for (Book book : bookList) {
            GlobalBookSearchDto item = new GlobalBookSearchDto(
                    book.getBookId(),
                    book.getTitle(),
                    book.getAuthor(),
                    book.getImageURL()
            );
            list.add(item);
        }

        return list;
    }

    @Override
    public Page<BookResponseDto> getTopBorrowedBooks(int page, int size) {

        Pageable pageable = PageRequest.of(page, size);
        Page<Borrow> borrowPage = borrowRepository.topBorrowedBooks(pageable);

        if (borrowPage.isEmpty()) {
            throw new ResourceListNotFoundException("Books");
        }

        Page<BookResponseDto> booksDto= borrowPage.map(borrow -> {
            Book book = borrow.getBorrowBooks();

            BookResponseDto bookResponseDto = new BookResponseDto(
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

            return bookResponseDto;
        });

        return booksDto;
    }

    @Override
    public Page<BookResponseDto> getAllNewArrivalBooks(int page, int size){
        Pageable pageable = PageRequest.of(page, size);
        Page<Book> bookPage = this.bookRepository.getAllNewArrivalBooks(pageable);

        if(bookPage.isEmpty()){
            throw new ResourceListNotFoundException("Books");
        }

        Page<BookResponseDto> newlyArrivedBooks = bookPage.map(
                book -> {
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
        );

        return newlyArrivedBooks;
    }

    @Override
    public Page<BookResponseDto> findBooksOrderByPublishedDate(int page, int size) {

        Pageable pageable = PageRequest.of(page, size);
        Page<Book> bookPage = this.bookRepository.findBooksOrderByPublishedDate(pageable);

        if(bookPage.isEmpty()){
            throw new ResourceListNotFoundException("Books");
        }

        return bookPage.map(
                book -> new BookResponseDto(
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
                )
        );
    }

}
