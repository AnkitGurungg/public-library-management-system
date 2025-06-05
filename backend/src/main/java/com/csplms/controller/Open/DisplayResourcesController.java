package com.csplms.controller.Open;

import com.csplms.entity.Book;
import com.csplms.entity.Borrow;
import com.csplms.entity.Category;
import com.csplms.service.LibrarianAdmin.BookService;
import com.csplms.service.LibrarianAdmin.CategoryService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.csplms.service.Open.DisplayResourcesService;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

@CrossOrigin(origins = "*")
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

    @GetMapping("/category/get/categories")
    public ResponseEntity<List<Category>> getCategories() {
        return new ResponseEntity<>(this.categoryService.getAllAvailableCategories(), HttpStatus.OK);
    }

    @GetMapping("/get/categories/{id}")
    public ResponseEntity<List<Book>> getFilteredBooksByCategory(@PathVariable("id") String id) {
        return new ResponseEntity<>(this.displayResourcesService.getFilteredBooksByCategory(Integer.parseInt(id)), HttpStatus.OK);
    }

    @GetMapping("/book/get/all/available/books")
    public ResponseEntity<List<Book>> getAllAvailableBooks() {
        return new ResponseEntity<>(this.displayResourcesService.getAllAvailableBooks(), HttpStatus.OK);
    }

    @GetMapping("/book/get/new-arrivals")
    public ResponseEntity<List<Book>> getNewArrivalBooks() {
        return new ResponseEntity<>(this.displayResourcesService.getAllNewArrivalBooks(), HttpStatus.OK);
    }

    @GetMapping("/book/get/top-borrowed-books")
    public ResponseEntity<List<Borrow>> getTopBorrowedBooks() {
        return new ResponseEntity<>(this.displayResourcesService.getTopBorrowedBooks(), HttpStatus.OK);
    }

    @GetMapping("/book/get/recently-published")
    public ResponseEntity<List<Book>> findBooksOrderByPublishedDate() {
        return new ResponseEntity<>(this.displayResourcesService.findBooksOrderByPublishedDate(), HttpStatus.OK);
    }

    @GetMapping("/book/get/{id}")
    public Book getBook(@PathVariable("id") int bookId) {
        return this.bookService.getBook(bookId);
    }

}
