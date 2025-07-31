package com.csplms.service.LibrarianAdmin;

import com.csplms.dto.requestDto.CategoryRequestDto;
import com.csplms.dto.responseDto.AvailableCategoryResponse;
import com.csplms.dto.responseDto.CategoryDto;
import com.csplms.dto.responseDto.CategoryResponseDto;
import com.csplms.entity.Category;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface CategoryService {
    CategoryResponseDto addCategory(CategoryRequestDto categoryRequestDto);

    CategoryDto getCategory(int categoryId);

    Category updateCategory(int categoryId, CategoryRequestDto categoryRequestDto);

    // Get all the available categories and shelfs according to category for add book
    List<AvailableCategoryResponse> getAllCategoriesAndShelfs();

    // Get all available categories to filter books according to category on user side
    List<CategoryResponseDto> getAllAvailableCategories();

    // Get all the categories to display on admin panel
    List<CategoryResponseDto> getCategories();

    @Transactional
    Integer deleteCategory(int categoryId);

    @Transactional
    Integer restoreCategory(int categoryId);
}
