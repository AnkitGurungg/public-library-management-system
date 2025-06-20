package com.csplms.dto.responseDto;

//Represents Khalti payment lookup(verification) the response
public record KhaltiPaymentLookupResponseDto(
        String pidx,
        Long total_amount, // amount of transaction in paisa
        String status,
        String transaction_id, // nullable
        Long fee,
        Boolean refunded
) {

}
