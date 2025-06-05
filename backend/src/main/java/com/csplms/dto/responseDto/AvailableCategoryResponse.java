package com.csplms.dto.responseDto;

import java.sql.Date;
import java.util.List;

public record AvailableCategoryResponse(
        Integer categoryId,
        String name,
        String startingNumber,
        String endingNumber,
        String description,
        Date addedDate,
        boolean present,
        List<CategoryShelfResponse> shelves
) {

}
