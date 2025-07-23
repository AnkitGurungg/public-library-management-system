package com.csplms.controller.LibrarianAdmin;

import com.csplms.dto.responseDto.AvailableCategoryResponse;
import com.csplms.dto.responseDto.CategoryDto;
import com.csplms.entity.Category;
import com.csplms.service.LibrarianAdmin.CategoryService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import com.csplms.dto.requestDto.CategoryRequestDto;
import com.csplms.dto.responseDto.CategoryResponseDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/la/categories")
@PreAuthorize("hasAnyAuthority('ROLE_LIBRARIAN', 'ROLE_ADMIN')")
public class CategoryController {

    private final CategoryService categoryService;

    @Autowired
    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @PostMapping
    public ResponseEntity<CategoryResponseDto> addCategory(@RequestBody CategoryRequestDto categoryRequestDto) {
        return new ResponseEntity<>(this.categoryService.addCategory(categoryRequestDto), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<CategoryResponseDto>> getCategories() {
        return new ResponseEntity<>(this.categoryService.getCategories(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CategoryDto> getCategory(@PathVariable("id") int categoryId) {
        return new ResponseEntity<>(this.categoryService.getCategory(categoryId), HttpStatus.OK);
    }

    @GetMapping("/get/categories/shelfs")
    public ResponseEntity<List<AvailableCategoryResponse>> getAllCategoriesAndShelfs() {
        return new ResponseEntity<>(this.categoryService.getAllCategoriesAndShelfs(), HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Category> updateCategory(@PathVariable("id") int categoryId, @RequestBody CategoryRequestDto categoryRequestDto) {
        return new ResponseEntity<>(this.categoryService.updateCategory(categoryId, categoryRequestDto), HttpStatus.OK);
    }

    @PutMapping("/restore/{id}")
    public ResponseEntity<Integer> restoreCategory(@PathVariable("id") int categoryId) {
        return new ResponseEntity<>(this.categoryService.restoreCategory(categoryId), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Integer> deleteCategory(@PathVariable("id") int categoryId) {
        return new ResponseEntity<>(this.categoryService.deleteCategory(categoryId), HttpStatus.OK);
    }

}
