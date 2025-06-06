package com.csplms.dto.responseDto;

import java.sql.Date;

public record BookDto(
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
        String imageURL,
        String description,
        Date addedDate,
        boolean available,

        Integer categoryId,
        String categoryName,

        Integer shelfId,
        String shelfName

) {

}
