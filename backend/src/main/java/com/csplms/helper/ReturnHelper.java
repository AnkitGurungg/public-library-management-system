package com.csplms.helper;

import com.csplms.entity.Book;
import com.csplms.entity.Borrow;
import com.csplms.entity.Return;
import com.csplms.exception.ResourceAlreadyExistsException;
import com.csplms.exception.ResourceEntityNotFoundException;
import com.csplms.repository.BookRepository;
import com.csplms.util.GlobalDateUtil;
import org.springframework.stereotype.Component;

@Component
public class ReturnHelper {

    private final GlobalDateUtil globalDateUtil;
    private final BookRepository bookRepository;

    public ReturnHelper(GlobalDateUtil globalDateUtil, BookRepository bookRepository) {
        this.globalDateUtil = globalDateUtil;
        this.bookRepository = bookRepository;
    }

    public boolean checkReturnStatus(Borrow borrow) {
        if(borrow.isReturnStatus()){
            throw new ResourceAlreadyExistsException("Book has already been returned!");
        }
        return true;
    }

    public Book increaseQuantity(Borrow borrow) {
        Book book = bookRepository.findById(borrow.getBorrowBooks().getBookId()).orElseThrow(() -> new ResourceEntityNotFoundException("Book", "Id", borrow.getBorrowBooks().getBookId()));
        book.setAvailableQuantity(book.getAvailableQuantity() + 1);
        return book;
    }

    public Return buildReturnBook(Borrow borrow) {
        Return returnBook = new Return();
        returnBook.setReturnDate(globalDateUtil.getCurrentDate());
        returnBook.setBorrows(borrow);
        return returnBook;
    }

}
