package com.csplms.service.Admin;

import com.csplms.entity.Book;
import com.csplms.entity.Borrow;
import com.csplms.entity.Payment;
import com.csplms.entity.User;
import com.csplms.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReportService {

    private final UserRepository userRepository;
    private final BorrowRepository borrowRepository;
    private final PaymentRepository paymentRepository;
    private final BookRepository bookRepository;
    private final CategoryRepository categoryRepository;

    @Autowired
    public ReportService(UserRepository userRepository, BorrowRepository borrowRepository, PaymentRepository paymentRepository, BookRepository bookRepository, CategoryRepository categoryRepository) {
        this.userRepository = userRepository;
        this.borrowRepository = borrowRepository;
        this.paymentRepository = paymentRepository;
        this.bookRepository = bookRepository;
        this.categoryRepository = categoryRepository;
    }

    public List<Book> getBooksNeverBorrowed() {
        return bookRepository.findBooksNeverBorrowed();
    }

    public List<Object[]> getMostPopularCategories() {
        return categoryRepository.findMostPopularCategories();
    }

}
