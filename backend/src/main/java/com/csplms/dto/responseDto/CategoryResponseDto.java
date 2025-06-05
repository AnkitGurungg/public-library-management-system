package com.csplms.dto.responseDto;

import java.sql.Date;

public record CategoryResponseDto (
        Integer categoryId,
        String name,
        String startingNumber,
        String endingNumber,
        String description,
        Date addedDate,
        boolean present
) {

}
