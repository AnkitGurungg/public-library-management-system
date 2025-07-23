package com.csplms.controller.Open;

import com.csplms.dto.responseDto.*;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.csplms.service.LibrarianAdmin.BookService;
import com.csplms.service.Open.DisplayResourcesService;
import com.csplms.service.LibrarianAdmin.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

@RestController
@RequestMapping("/api/v1/p/resource")
public class DisplayResourcesController {

    private final CategoryService categoryService;
    private final DisplayResourcesService displayResourcesService;
    private final BookService bookService;

    @Autowired
    public DisplayResourcesController(DisplayResourcesService displayResourcesService, CategoryService categoryService, BookService bookService) {
        this.displayResourcesService = displayResourcesService;
        this.categoryService = categoryService;
        this.bookService = bookService;
    }

    @GetMapping("/categories/active")
    public ResponseEntity<List<CategoryResponseDto>> getCategories() {
        return new ResponseEntity<>(this.categoryService.getAllAvailableCategories(), HttpStatus.OK);
    }

    @GetMapping("/categories/{id}/books")
    public ResponseEntity<List<BookResponseDto>> getFilteredBooksByCategory(@PathVariable("id") String id) {
        return new ResponseEntity<>(this.displayResourcesService.getFilteredBooksByCategory(Integer.parseInt(id)), HttpStatus.OK);
    }

    @GetMapping("/books/{id}")
    public BookDto getBook(@PathVariable("id") int bookId) {
        return this.bookService.getBook(bookId);
    }

    @GetMapping("/books/search-books")
    public ResponseEntity<List<GlobalBookSearchDto>> getAllAvailableBooks() {
        return new ResponseEntity<>(this.displayResourcesService.getAllAvailableBooks(), HttpStatus.OK);
    }

    @GetMapping("/books/top-borrowed-books")
    public ResponseEntity<Page<BookResponseDto>> getTopBorrowedBooks(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size
    ) {
        return new ResponseEntity<>(
                displayResourcesService.getTopBorrowedBooks(page, size),
                HttpStatus.OK
        );
    }

    @GetMapping("/books/new-arrivals")
    public ResponseEntity<Page<BookResponseDto>> getNewArrivalBooks(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size
    ) {
        return new ResponseEntity<>(
                this.displayResourcesService.getAllNewArrivalBooks(page, size),
                HttpStatus.OK
        );
    }

    @GetMapping("/books/recently-published")
    public ResponseEntity<Page<BookResponseDto>> findBooksOrderByPublishedDate(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size
    ) {
        return new ResponseEntity<>(
                this.displayResourcesService.findBooksOrderByPublishedDate(page, size),
                HttpStatus.OK
        );
    }

}
