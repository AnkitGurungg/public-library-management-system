package com.csplms.dto.responseDto;

import java.sql.Date;

public record BorrowResponseDto(
        Integer borrowId,
        Integer bookId,
        Integer userId,
        boolean returnStatus,
        int borrowLimit,
        Date borrowDate,
        Date dueDate,
        boolean extended
) {

}
