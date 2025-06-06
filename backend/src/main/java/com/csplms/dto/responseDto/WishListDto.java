package com.csplms.dto.responseDto;

import java.sql.Date;

public record WishListDto(
        Long wishListId,

        Integer bookId,
        String isbn,
        String title,
        String author,
        String language,
        Date publishedDate,
        int availableQuantity,
        String imageURL,

        Integer categoryId,
        String categoryName,

        Integer shelfId,
        String shelfName

) {

}
