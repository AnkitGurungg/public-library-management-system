package com.csplms.service.Member;

import com.csplms.dto.responseDto.BookReturnDto;
import org.springframework.data.domain.Page;

import java.util.Map;

public interface BorrowedBooksService {
    Page<BookReturnDto> getBorrowedBooks(int pageNumber, int pageSize, String title, String language, Integer categoryId, Boolean extended);

    Map<String, Object> getBorrowedBookFilters();
}
