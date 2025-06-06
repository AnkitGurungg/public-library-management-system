package com.csplms.dto.responseDto;

public record GlobalBookSearchDto(
        Integer bookId,
        String title,
        String author,
        String imageURL
) {

}
