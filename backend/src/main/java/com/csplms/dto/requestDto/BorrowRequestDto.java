package com.csplms.dto.requestDto;

import java.sql.Date;

public record BorrowRequestDto(
        int bookId,
        int userId,
        Date dueDate
) {

}