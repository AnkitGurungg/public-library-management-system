package com.csplms.dto.responseDto;

import java.sql.Date;

public record ShelfDto(
        Integer shelfId,
        String name,
        Date addedDate,
        int availableCapacity,
        int totalCapacity,
        String description,
        boolean present,

        Integer categoryId,
        String categoryName
) {

}
