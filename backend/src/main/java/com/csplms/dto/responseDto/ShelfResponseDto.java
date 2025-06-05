package com.csplms.dto.responseDto;

import java.sql.Date;

public record ShelfResponseDto(
        Integer shelfId,
        String name,
        int capacity,
        Date addedDate,
        String description,
        boolean present,
        Integer categoryId
) {

}
