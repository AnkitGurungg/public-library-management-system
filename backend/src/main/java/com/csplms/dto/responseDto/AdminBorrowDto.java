package com.csplms.dto.responseDto;

import java.sql.Date;

public record AdminBorrowDto(
        Integer borrowId,
        Date borrowDate,
        Date dueDate,
        boolean extended,
        boolean returnStatus,

        Integer bookId,
        String bookTitle,

        Integer userId,
        String username
) {

}
