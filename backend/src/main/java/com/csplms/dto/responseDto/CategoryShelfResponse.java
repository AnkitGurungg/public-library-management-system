package com.csplms.dto.responseDto;

import com.csplms.entity.Shelf;

import java.sql.Date;

public record CategoryShelfResponse(
         Integer shelfId,
         String name,
         int capacity,
         Date addedDate,
         String description,
         boolean present
) {
    public CategoryShelfResponse(Shelf shelf) {
        this(
                shelf.getShelfId(),
                shelf.getName(),
                shelf.getTotalCapacity(),
                shelf.getAddedDate(),
                shelf.getDescription(),
                shelf.isPresent()
        );
    }

}
