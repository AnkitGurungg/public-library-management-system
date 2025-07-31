package com.csplms.service.LibrarianAdmin;

import com.csplms.repository.BookRepository;
import com.csplms.repository.BorrowRepository;
import com.csplms.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class DashboardServiceImpl implements DashboardService {

    private final BookRepository bookRepository;
    private final UserRepository userRepository;
    private final BorrowRepository borrowRepository;

    @Autowired
    public DashboardServiceImpl(BookRepository bookRepository, UserRepository userRepository, BorrowRepository borrowRepository) {
        this.userRepository = userRepository;
        this.bookRepository = bookRepository;
        this.borrowRepository = borrowRepository;
    }

    @Override
    public Integer countMembersToVerify() {
        return this.userRepository.countMembersToVerify();
    }

    @Override
    public Integer countVerifiedMembers() {
        return this.userRepository.countVerifiedMembers();
    }

    @Override
    public Integer countBorrowedBooks() {
        return this.borrowRepository.countBorrowedBooks();
    }

    @Override
    public Integer countBooks() {
        return this.bookRepository.countBooks();
    }

    @Override
    public List<Map<String, Object>> getBorrowStatsByYear(int year) {
        List<Object[]> results = borrowRepository.countBorrowsByMonth(year);
        List<Map<String, Object>> stats = new ArrayList<>();

        // Create a map with all months initialized to 0
        Map<Integer, Integer> monthCounts = new HashMap<>();
        for (int i = 1; i <= 12; i++) {
            monthCounts.put(i, 0);
        }

        // Fill in actual data
        for (Object[] result : results) {
            int month = ((Number) result[0]).intValue();
            int count = ((Number) result[1]).intValue();
            monthCounts.put(month, count);
        }

        // Convert to the format needed for the chart
        String[] monthNames = {"January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"};

        for (int i = 1; i <= 12; i++) {
            Map<String, Object> monthData = new HashMap<>();
            monthData.put("month", monthNames[i-1]);
            monthData.put("borrowCount", monthCounts.get(i));
            stats.add(monthData);
        }

        return stats;
    }
}
