package com.csplms.dto.requestDto;

public record KhaltiPaymentInitiateRequestDto(
        Long totalAmount,
        Integer fineId,
        String borrowedBookName,
//        Integer userId,
        Integer bookId
) {

}
