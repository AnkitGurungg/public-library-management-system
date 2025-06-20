package com.csplms.dto.requestDto;

public record KhaltiPaymentVerificationRequestDto(
        String status,
        String pidx,
        String txnId,
        String tidx,
        String total_amount,
        String purchase_order_id,
        String purchase_order_name
) {

}
