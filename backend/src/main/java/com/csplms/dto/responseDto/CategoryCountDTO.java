package com.csplms.dto.responseDto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CategoryCountDTO {

    private String categoryName;
    private Long bookCount;

    public CategoryCountDTO(String categoryName, Long bookCount) {
        this.categoryName = categoryName;
        this.bookCount = bookCount;
    }

}
