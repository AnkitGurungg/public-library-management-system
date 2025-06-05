package com.csplms.controller.Member;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import com.csplms.dto.responseDto.BookReturnDto;
import com.csplms.service.Member.BorrowedBooksService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/mla/user/profile")
@EnableMethodSecurity(prePostEnabled = true)
@PreAuthorize("hasAnyAuthority('ROLE_MEMBER', 'ROLE_LIBRARIAN', 'ROLE_ADMIN')")
public class BorrowedBooksController {

    private final BorrowedBooksService borrowedBooksService;

    @Autowired
    public BorrowedBooksController(BorrowedBooksService borrowedBooksService) {
        this.borrowedBooksService = borrowedBooksService;
    }

    @GetMapping("/borrowed-books")
    public ResponseEntity<List<BookReturnDto>> getBorrowedBooks() {
        return new ResponseEntity<>(this.borrowedBooksService.getBorrowedBooks(), HttpStatus.OK);
    }

}
