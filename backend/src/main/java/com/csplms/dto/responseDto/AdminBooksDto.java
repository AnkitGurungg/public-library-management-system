package com.csplms.dto.responseDto;

import java.sql.Date;

public record AdminBooksDto(
        Integer bookId,
        String title,
        String author,
        Date publishedDate,
        String language,
        int availableQuantity,
        boolean available,

        Integer categoryId,
        String categoryName,

        Integer shelfId,
        String shelfName
) {

}
