package com.csplms.dto.responseDto;

import java.sql.Date;

public record AdminFineDto(
        Integer fineId,
        long totalFine,
        boolean paidStatus,

        Integer userId,
        String userName,

        Integer bookId,
        String bookTitle,

        Integer categoryId,
        String categoryName,

        Integer borrowId,
        Date borrowDate,
        Date dueDate,

        Integer returnId,
        Date returnDate
) {

}
