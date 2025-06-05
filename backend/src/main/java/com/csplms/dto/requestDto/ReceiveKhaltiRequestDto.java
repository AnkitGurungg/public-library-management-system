package com.csplms.dto.requestDto;

public record ReceiveKhaltiRequestDto(
        Long totalAmount,
        Integer fineId,
        String borrowedBookName,
//        Integer userId,
        Integer bookId
) {

}
