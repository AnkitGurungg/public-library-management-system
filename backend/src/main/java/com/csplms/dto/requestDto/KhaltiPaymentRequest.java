package com.csplms.dto.requestDto;

public record KhaltiPaymentRequest(
        String return_url,
        String website_url,
        long amount,
        Integer purchase_order_id,
        String purchase_order_name,
        UserRequestDto customer_info
) {

}
