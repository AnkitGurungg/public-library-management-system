package com.csplms.controller.Admin;

import com.csplms.entity.User;
import com.csplms.service.Admin.LibrarianService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/v1/a/librarian")
@PreAuthorize("hasAuthority('ROLE_ADMIN')")
public class LibrarianController {

    private final LibrarianService librarianService;

    @Autowired
    public LibrarianController(LibrarianService librarianService){
        this.librarianService = librarianService;
    }

    @GetMapping("/get/librarians")
    public ResponseEntity<List<User>> getAllLibrarians(HttpServletRequest request, HttpServletResponse response) {
        return new ResponseEntity<>(librarianService.getAllLibrarians(), HttpStatus.OK);
    }

    @PutMapping("/restore/{id}")
    public ResponseEntity<Integer> restoreLibrarian(@PathVariable("id") Integer userId) {
        return new ResponseEntity<>(this.librarianService.restoreMember(userId), HttpStatus.OK);
    }

}
