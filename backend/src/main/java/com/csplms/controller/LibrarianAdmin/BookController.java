package com.csplms.controller.LibrarianAdmin;

import com.csplms.entity.Book;
import com.csplms.exception.MailFailedException;
import com.csplms.service.LibrarianAdmin.BookService;
import jakarta.mail.MessagingException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import com.csplms.dto.requestDto.BookRequestDto;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.web.bind.annotation.*;
import com.csplms.dto.responseDto.BookResponseDto;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.io.IOException;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/v1/la/book")
@EnableMethodSecurity(prePostEnabled = true)
@PreAuthorize("hasAnyAuthority('ROLE_LIBRARIAN', 'ROLE_ADMIN')")
public class BookController {

    private final BookService bookService;

    @Autowired
    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    @PostMapping("/add")
    public ResponseEntity<BookResponseDto> addBook(
            @RequestPart BookRequestDto bookRequestDto,
            @RequestPart MultipartFile bookImage
    ) throws IOException, MessagingException, MailFailedException {
        return this.bookService.addBook(bookRequestDto, bookImage);
    }

    @GetMapping("/get/{id}")
    public Book getBook(@PathVariable("id") int bookId) {
        return this.bookService.getBook(bookId);
    }

    @GetMapping("/get/user/{id}")
    public ResponseEntity<String> getBookAddedUser(@PathVariable("id") int bookId) {
        return new ResponseEntity<>(this.bookService.getBookAddedUser(bookId), HttpStatus.OK);
    }

    @GetMapping("/get/books")
    public List<Book> getBooks() {
        return this.bookService.getAllBooks();
    }

    @DeleteMapping("/delete/{id}")
    public void deleteBook(@PathVariable("id") int bookId) {
        this.bookService.deleteBook(bookId);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<BookResponseDto> updateBook(@PathVariable Integer id, @RequestPart BookRequestDto bookRequestDto, @RequestPart(value = "bookImage", required = false) MultipartFile bookImage) {
        return new ResponseEntity<>(this.bookService.updateBook(id, bookRequestDto, bookImage), HttpStatus.CREATED);
    }

    @PutMapping("/restore/{id}")
    public ResponseEntity<BookResponseDto> restoreBook(@PathVariable Integer id) {
        return new ResponseEntity<>(this.bookService.restoreBook(id), HttpStatus.OK);
    }

}
