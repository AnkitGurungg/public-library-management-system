package com.csplms.controller.Member;

import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import com.csplms.dto.responseDto.BookReturnDto;
import com.csplms.service.Member.BorrowedBooksService;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/mla/user/borrowed-books")
@PreAuthorize("hasAnyAuthority('ROLE_MEMBER', 'ROLE_LIBRARIAN', 'ROLE_ADMIN')")
public class BorrowedBooksController {

    private final BorrowedBooksService borrowedBooksService;

    @Autowired
    public BorrowedBooksController(BorrowedBooksService borrowedBooksService) {
        this.borrowedBooksService = borrowedBooksService;
    }

    @GetMapping
    public ResponseEntity<Page<BookReturnDto>> getBorrowedBooks(
            @RequestParam(defaultValue = "0") int pageNumber,
            @RequestParam(defaultValue = "11") int pageSize,
            @RequestParam(required = false) String title,
            @RequestParam(required = false) String language,
            @RequestParam(required = false) Integer categoryId,
            @RequestParam(required = false) Boolean extended
    ) {
        return new ResponseEntity<>(
                this.borrowedBooksService.getBorrowedBooks(pageNumber, pageSize, title, language, categoryId, extended),
                HttpStatus.OK
        );
    }

    @GetMapping("/filters")
    public ResponseEntity<Map<String, Object>> getBorrowedBookFilters() {
        return new ResponseEntity<>(this.borrowedBooksService.getBorrowedBookFilters(), HttpStatus.OK);
    }

}
