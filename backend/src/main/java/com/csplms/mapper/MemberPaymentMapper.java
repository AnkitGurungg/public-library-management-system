package com.csplms.mapper;

import com.csplms.dto.requestDto.UserRequestDto;
import org.springframework.stereotype.Component;
import com.csplms.dto.requestDto.ReceiveKhaltiRequestDto;
import com.csplms.dto.requestDto.InitiateKhaltiRequestDto;

@Component
public class MemberPaymentMapper {

    public InitiateKhaltiRequestDto toInitiateKhaltiRequestDto(ReceiveKhaltiRequestDto receiveKhaltiRequestDto) {
        return new InitiateKhaltiRequestDto(
                "http://localhost:8080/get/fines/response",
                "http://localhost:8080/",
                receiveKhaltiRequestDto.totalAmount() * 100,
                receiveKhaltiRequestDto.fineId(),
                "Fine: " + receiveKhaltiRequestDto.fineId(),
                new UserRequestDto("Ankit", "9806140735", "xyz@gmail.com", "Pokhara-29")
        );
    }
}
