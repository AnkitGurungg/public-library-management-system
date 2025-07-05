package com.csplms.dto.responseDto;

import java.sql.Date;

public record MemberFineDto(
        Integer fineId,
        Long totalFine,
        boolean paidStatus,

        Integer bookId,
        String title,
        String language,
        String imageURL,

        Integer categoryId,
        String categoryName,

        Date borrowDate,
        Date dueDate,
        boolean extended,

        Date returnDate,

        Integer paymentId,
        Integer paidAmount
) {

}
