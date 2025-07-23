package com.csplms.controller.Admin;

import com.csplms.entity.Book;
import org.springframework.http.HttpStatus;
import com.csplms.service.Admin.ReportService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import com.csplms.dto.responseDto.reports.MostPopularCategoryDTO;

import java.util.List;

@RestController
@RequestMapping("/api/v1/a/reports")
@PreAuthorize("hasAuthority('ROLE_ADMIN')")
public class ReportController {

    private final ReportService reportService;

    @Autowired
    public ReportController(ReportService reportService) {
        this.reportService = reportService;
    }

    @GetMapping("/never-borrowed")
    public ResponseEntity<List<Book>> getBooksNeverBorrowed() {
        return new ResponseEntity<>(reportService.getBooksNeverBorrowed(), HttpStatus.OK);
    }

    @GetMapping("/most-popular-category")
    public ResponseEntity<List<MostPopularCategoryDTO>> getMostPopularCategories() {
        return new ResponseEntity<>(reportService.getMostPopularCategories(), HttpStatus.OK);
    }

}
