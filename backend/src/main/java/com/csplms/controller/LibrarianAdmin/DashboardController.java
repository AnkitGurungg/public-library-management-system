package com.csplms.controller.LibrarianAdmin;

import com.csplms.dto.responseDto.CategoryCountDTO;
import com.csplms.service.LibrarianAdmin.BookService;
import com.csplms.service.LibrarianAdmin.DashboardService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/v1/la/dashboard")
@EnableMethodSecurity(prePostEnabled = true)
@PreAuthorize("hasAnyAuthority('ROLE_LIBRARIAN', 'ROLE_ADMIN')")
public class DashboardController {

    private final DashboardService dashboardService;
    private final BookService bookService;

    public DashboardController(DashboardService dashboardService, BookService bookService) {
        this.dashboardService = dashboardService;
        this.bookService = bookService;
    }

    @GetMapping("/members/count-vm")
    public ResponseEntity<Integer> countVerifiedMembers() {
        return new ResponseEntity<>(this.dashboardService.countVerifiedMembers(), HttpStatus.OK);
    }

    @GetMapping("/members/count-nonvm")
    public ResponseEntity<Integer> countMembersToVerify() {
        return new ResponseEntity<>(this.dashboardService.countMembersToVerify(), HttpStatus.OK);
    }

    @GetMapping("/books/count")
    public ResponseEntity<Integer> countBooks() {
        return new ResponseEntity<>(this.dashboardService.countBooks(), HttpStatus.OK);
    }

    @GetMapping("/books/count-bb")
    public ResponseEntity<Integer> countBorrowedBooks() {
        return new ResponseEntity<>(this.dashboardService.countBorrowedBooks(), HttpStatus.OK);
    }

    @GetMapping("/categories/book-counts")
    public ResponseEntity<List<CategoryCountDTO>> getCategoryStats() {
        List<CategoryCountDTO> stats = bookService.getTopCategoriesForPieChart();
        return ResponseEntity.ok(stats);
    }

    @GetMapping("/borrows/count-by-month/{year}")
    public ResponseEntity<List<Map<String, Object>>> getBorrowStatsByYear(@PathVariable int year) {
        return ResponseEntity.ok(dashboardService.getBorrowStatsByYear(year));
    }

}
