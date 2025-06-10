package com.csplms.controller.LibrarianAdmin;

import com.csplms.entity.Return;
import com.csplms.exception.MailFailedException;
import com.csplms.service.LibrarianAdmin.ReturnService;
import jakarta.mail.MessagingException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/la/returns")
@EnableMethodSecurity(prePostEnabled = true)
@PreAuthorize("hasAnyAuthority('ROLE_LIBRARIAN', 'ROLE_ADMIN')")
public class ReturnController {

    private final ReturnService returnService;

    @Autowired
    public ReturnController(ReturnService returnService) {
        this.returnService = returnService;
    }

    @PostMapping("/{id}")
    public ResponseEntity<Return> returnBook(@PathVariable("id") int borrowId) throws MessagingException, MailFailedException {
        return new ResponseEntity<>(this.returnService.returnBook(borrowId), HttpStatus.OK);
    }

    @GetMapping("/get/returns")
    public ResponseEntity<List<Return>> returnBooks() {
        return new ResponseEntity<>(this.returnService.getAllReturns(), HttpStatus.OK);
    }

}
