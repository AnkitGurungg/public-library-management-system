package com.csplms.service.LibrarianAdmin;

import java.util.List;
import java.util.Map;

public interface DashboardService {
    Integer countMembersToVerify();

    Integer countVerifiedMembers();

    Integer countBorrowedBooks();

    Integer countBooks();

    List<Map<String, Object>> getBorrowStatsByYear(int year);
}
