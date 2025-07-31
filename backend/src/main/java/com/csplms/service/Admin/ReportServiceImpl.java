package com.csplms.service.Admin;

import com.csplms.dto.responseDto.reports.MostPopularCategoryDTO;
import com.csplms.entity.Book;
import com.csplms.entity.Category;
import com.csplms.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ReportServiceImpl implements ReportService {

    private final UserRepository userRepository;
    private final BorrowRepository borrowRepository;
    private final PaymentRepository paymentRepository;
    private final BookRepository bookRepository;
    private final CategoryRepository categoryRepository;

    @Autowired
    public ReportServiceImpl(UserRepository userRepository, BorrowRepository borrowRepository, PaymentRepository paymentRepository, BookRepository bookRepository, CategoryRepository categoryRepository) {
        this.userRepository = userRepository;
        this.borrowRepository = borrowRepository;
        this.paymentRepository = paymentRepository;
        this.bookRepository = bookRepository;
        this.categoryRepository = categoryRepository;
    }

    @Override
    public List<Book> getBooksNeverBorrowed() {
        return bookRepository.findBooksNeverBorrowed();
    }

    @Override
    public List<MostPopularCategoryDTO> getMostPopularCategories() {
//        most popular categories
        List<Object[]> results = categoryRepository.findMostPopularCategories();

        List<MostPopularCategoryDTO> response = results.stream()
                .map(result -> {
                    Category category = (Category) result[0];
                    long borrowCount = (long) result[1];

                    return new MostPopularCategoryDTO(
                            category.getCategoryId(),
                            category.getName(),
                            category.getStartingNumber(),
                            category.getEndingNumber(),
                            category.getAddedDate(),
                            category.isPresent(),
                            (int) borrowCount
                    );
                })
                .collect(Collectors.toList());

        return response;
    }

}
