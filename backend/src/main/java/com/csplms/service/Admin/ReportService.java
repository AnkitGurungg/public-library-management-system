package com.csplms.service.Admin;

import com.csplms.dto.responseDto.reports.MostPopularCategoryDTO;
import com.csplms.entity.Book;

import java.util.List;

public interface ReportService {
    List<Book> getBooksNeverBorrowed();

    List<MostPopularCategoryDTO> getMostPopularCategories();
}
