package com.csplms.service.Open;

import com.csplms.dto.responseDto.BookResponseDto;
import com.csplms.dto.responseDto.GlobalBookSearchDto;
import org.springframework.data.domain.Page;

import java.util.List;

public interface DisplayResourcesService {
    List<BookResponseDto> getFilteredBooksByCategory(Integer categoryId);

    List<GlobalBookSearchDto> getAllAvailableBooks();

    Page<BookResponseDto> getTopBorrowedBooks(int page, int size);

    Page<BookResponseDto> getAllNewArrivalBooks(int page, int size);

    Page<BookResponseDto> findBooksOrderByPublishedDate(int page, int size);
}
