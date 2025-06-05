package com.csplms.service.Open;

import com.csplms.dto.responseDto.BookResponseDto;
import com.csplms.dto.responseDto.FeaturedBooksDto;
import com.csplms.entity.Book;
import com.csplms.entity.Borrow;
import com.csplms.exception.ResourceListNotFoundException;
import com.csplms.repository.BookRepository;
import com.csplms.repository.BorrowRepository;
import com.csplms.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class DisplayResourcesService {

    private final CategoryRepository categoryRepository;
    private final BookRepository bookRepository;
    private final BorrowRepository borrowRepository;

    @Autowired
    public DisplayResourcesService(CategoryRepository categoryRepository, BookRepository bookRepository, BorrowRepository borrowRepository) {
        this.categoryRepository = categoryRepository;
        this.bookRepository = bookRepository;
        this.borrowRepository = borrowRepository;
    }

    public List<Book> getFilteredBooksByCategory(Integer categoryId) {
        List<Book> filteredBooks = bookRepository.getFilteredBooksByCategory(categoryId);
        if (filteredBooks.isEmpty()){
            throw new ResourceListNotFoundException("Books");
        }
        return filteredBooks;
    }


    public List<Book> getAllAvailableBooks() {
        List<Book> bookList = this.bookRepository.getAllAvailableBooks();
        if(bookList.isEmpty()){
            throw new ResourceListNotFoundException("Books");
        }
        return bookList;
    }

    public List<FeaturedBooksDto> getTopBorrowedBooks(){
        List<Borrow> bookList = this.borrowRepository.topBorrowedBooks();
        if(bookList.isEmpty()){
            throw new ResourceListNotFoundException("Books");
        }

        List<FeaturedBooksDto> filteredBooks = new ArrayList<>();
        for(Borrow borrow : bookList){
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

            filteredBooks.add(new FeaturedBooksDto(borrow.getBorrowId(), bookResponseDto));
        }

        return filteredBooks;
    }

    public List<FeaturedBooksDto> getAllNewArrivalBooks(){
        List<Book> bookList = this.bookRepository.getAllNewArrivalBooks();
        if(bookList.isEmpty()){
            throw new ResourceListNotFoundException("Books");
        }

        List<FeaturedBooksDto> filteredBooks = new ArrayList<>();
        for(Book book : bookList){
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

            filteredBooks.add(new FeaturedBooksDto(0, bookResponseDto));
        }
        return filteredBooks;
    }

    public List<FeaturedBooksDto> findBooksOrderByPublishedDate() {
        List<Book> bookList = this.bookRepository.findBooksOrderByPublishedDate();
        if(bookList.isEmpty()){
            throw new ResourceListNotFoundException("Books");
        }

        List<FeaturedBooksDto> filteredBooks = new ArrayList<>();
        for(Book book : bookList){
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

            filteredBooks.add(new FeaturedBooksDto(0, bookResponseDto));
        }
        return filteredBooks;
    }

}
