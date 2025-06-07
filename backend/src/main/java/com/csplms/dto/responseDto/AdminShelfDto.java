package com.csplms.dto.responseDto;

import java.sql.Date;

public record AdminShelfDto(
        Integer shelfId,
        String name,
        Date addedDate,
        int availableCapacity,
        int totalCapacity,
        boolean present,

        Integer categoryId,
        String categoryName
) {

}
