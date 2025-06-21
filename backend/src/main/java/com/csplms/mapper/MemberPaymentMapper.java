package com.csplms.mapper;

import com.csplms.dto.requestDto.UserRequestDto;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import com.csplms.dto.requestDto.KhaltiPaymentInitiateRequestDto;
import com.csplms.dto.requestDto.KhaltiPaymentRequest;

@Component
public class MemberPaymentMapper {

    @Value("${frontend.base-url}")
    private String baseUrl;

    @Value("${frontend.payment-response-url}")
    private String paymentResponseUrl;

    public KhaltiPaymentRequest prepareKhaltiPayment(KhaltiPaymentInitiateRequestDto khaltiPaymentInitiateRequestDto) {
        return new KhaltiPaymentRequest(
                paymentResponseUrl,
                baseUrl,
                khaltiPaymentInitiateRequestDto.totalAmount() * 100,
                khaltiPaymentInitiateRequestDto.fineId(),
                "Fine: " + khaltiPaymentInitiateRequestDto.fineId(),
                new UserRequestDto("Ankit", "9806140735", "xyz@gmail.com", "Pokhara-29")
        );
    }
}
