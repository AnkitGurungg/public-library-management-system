package com.csplms.service.Open;

import com.csplms.entity.Book;
import com.csplms.entity.Borrow;
import com.csplms.exception.ResourceListNotFoundException;
import com.csplms.repository.BookRepository;
import com.csplms.repository.BorrowRepository;
import com.csplms.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

    public List<Book> getAllNewArrivalBooks(){
        List<Book> bookList = this.bookRepository.getAllNewArrivalBooks();
        if(bookList.isEmpty()){
            throw new ResourceListNotFoundException("Books");
        }
        return bookList;
    }

    public List<Borrow> getTopBorrowedBooks(){
        List<Borrow> bookList = this.borrowRepository.topBorrowedBooks();
        if(bookList.isEmpty()){
            throw new ResourceListNotFoundException("Books");
        }
        return bookList;
    }

    public List<Book> getAllAvailableBooks() {
        List<Book> bookList = this.bookRepository.getAllAvailableBooks();
        if(bookList.isEmpty()){
            throw new ResourceListNotFoundException("Books");
        }
        return bookList;
    }

    public List<Book> findBooksOrderByPublishedDate() {
        List<Book> bookList = this.bookRepository.findBooksOrderByPublishedDate();
        if(bookList.isEmpty()){
            throw new ResourceListNotFoundException("Books");
        }
        return bookList;
    }

}
