package com.csplms.dto.responseDto;

import java.sql.Date;

public record BookReturnDto(
        Integer bookId,
        String title,
        String language,
        String imageURL,

        Integer categoryId,
        String categoryName,

        Date borrowDate,
        Date dueDate,
        boolean extended,
        boolean returnStatus,

        Date returnDate
) {

}
