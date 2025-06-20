package com.csplms.dto.requestDto;

//Request payload for Khalti payment lookup(verification),
//containing pidx(the payment id of the transaction)
public record KhaltiPaymentLookupRequestDto(
        String pidx
) {

}
