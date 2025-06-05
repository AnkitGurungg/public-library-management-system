package com.csplms.dto.requestDto;

public record ShelfRequestDto(
        String name,
        int capacity,
        String description,
        Integer categoryId
) {

}
