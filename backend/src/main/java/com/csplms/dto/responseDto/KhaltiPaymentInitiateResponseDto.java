package com.csplms.dto.responseDto;

import java.util.Date;

public record KhaltiPaymentInitiateResponseDto(
        String pidx,
        String payment_url,
        Date expires_at,
        long expires_in
) {

}
