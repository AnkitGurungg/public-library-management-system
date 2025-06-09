package com.csplms.controller.Admin;

import com.csplms.entity.Book;
import com.csplms.service.Admin.ReportService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/v1/a/reports")
@PreAuthorize("hasAuthority('ROLE_ADMIN')")
public class ReportController {

    private final ReportService reportService;

    @Autowired
    public ReportController(ReportService reportService) {
        this.reportService = reportService;
    }

    @GetMapping("/most-popular-category")
    public ResponseEntity<List<Map<String, Object>>> getMostPopularCategories() {
//        most popular category
        List<Object[]> results = reportService.getMostPopularCategories();
        List<Map<String, Object>> response = results.stream()
                .map(result -> {
                    Map<String, Object> map = new HashMap<>();
                    map.put("category", result[0]);
                    map.put("borrowCount", result[1]);
                    return map;
                })
                .collect(Collectors.toList());
        return ResponseEntity.ok(response);
    }

    @GetMapping("/never-borrowed")
    public ResponseEntity<List<Book>> getBooksNeverBorrowed() {
        return ResponseEntity.ok(reportService.getBooksNeverBorrowed());
    }

}
