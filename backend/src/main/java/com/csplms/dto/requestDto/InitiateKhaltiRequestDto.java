package com.csplms.dto.requestDto;

import com.csplms.entity.Fine;

public record InitiateKhaltiRequestDto(
        String return_url,
        String website_url,
        long amount,
        Integer purchase_order_id,
        String purchase_order_name,
        UserRequestDto customer_info
) {

}
