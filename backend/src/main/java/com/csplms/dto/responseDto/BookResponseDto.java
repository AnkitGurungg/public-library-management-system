package com.csplms.dto.responseDto;
import java.sql.Date;

public record BookResponseDto(
        Integer bookId,
        String isbn,
        String title,
        String author,
        String language,
        String edition,
        int pageCount,
        int quantity,
        Date publishedDate,
        float price,
        String imageUrl,
        String description,
        Date addedDate,
        Date updatedDate,
        boolean available,
        Integer categoryId
){

}
