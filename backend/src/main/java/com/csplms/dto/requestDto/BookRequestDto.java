package com.csplms.dto.requestDto;

import java.sql.Date;

public record BookRequestDto(
        String isbn,
        String title,
        String author,
        String language,
        String edition,
        int pageCount,
        int quantity,
        Date publishedDate,
        float price,
        String imageURL,
        String description,
        Integer categoryId,
        Integer shelfId
){

}