package com.csplms.dto.responseDto;

//Response returned to the frontend after verifying a Khalti payment
public record KhaltiPaymentVerificationResponseDto(
        boolean success,
        String status,
        String message,
        Object data
) {

}
