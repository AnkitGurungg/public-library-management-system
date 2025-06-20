package com.csplms.mapper;

import com.csplms.dto.requestDto.UserRequestDto;
import org.springframework.stereotype.Component;
import com.csplms.dto.requestDto.KhaltiPaymentInitiateRequestDto;
import com.csplms.dto.requestDto.KhaltiPaymentRequest;

@Component
public class MemberPaymentMapper {

    public KhaltiPaymentRequest prepareKhaltiPayment(KhaltiPaymentInitiateRequestDto khaltiPaymentInitiateRequestDto) {
        return new KhaltiPaymentRequest(
                "http://localhost:5173/payment/response",
                "http://localhost:5173/",
                khaltiPaymentInitiateRequestDto.totalAmount() * 100,
                khaltiPaymentInitiateRequestDto.fineId(),
                "Fine: " + khaltiPaymentInitiateRequestDto.fineId(),
                new UserRequestDto("Ankit", "9806140735", "xyz@gmail.com", "Pokhara-29")
        );
    }
}
