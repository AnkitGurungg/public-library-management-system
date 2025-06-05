package com.csplms.mapper;

import com.csplms.dto.responseDto.CategoryResponseDto;
import com.csplms.entity.Category;
import com.csplms.dto.requestDto.CategoryRequestDto;
import com.csplms.entity.User;
import com.csplms.util.GlobalDateUtil;
import org.springframework.stereotype.Component;

import java.sql.Date;
import java.time.LocalDate;

@Component
public class CategoryMapper {

    private final GlobalDateUtil globalDateUtil;

    public CategoryMapper(GlobalDateUtil globalDateUtil) {
        this.globalDateUtil = globalDateUtil;
    }

    public Category toCategory(CategoryRequestDto categoryRequestDto, User user) {
        return new Category(
                categoryRequestDto.name(),
                categoryRequestDto.startingNumber(),
                categoryRequestDto.endingNumber(),
                categoryRequestDto.description(),
                globalDateUtil.getCurrentDate(),
                true,
                user
        );
    }

    public Category toUpdateCategory(CategoryRequestDto categoryRequestDto, Category category) {
        category.setName(categoryRequestDto.name());
        category.setStartingNumber(categoryRequestDto.startingNumber());
        category.setEndingNumber(categoryRequestDto.endingNumber());
        category.setDescription(categoryRequestDto.description());

        return category;
    }

    public CategoryResponseDto toCategoryResponseDto(Category category) {
        return new CategoryResponseDto(
                category.getCategoryId(),
                category.getName(),
                category.getStartingNumber(),
                category.getEndingNumber(),
                category.getDescription(),
                category.getAddedDate(),
                category.isPresent()
        );
    }
}