package com.csplms.dto.requestDto;

public record KYCFillUpDto(
        String name,
        String contactNumber,
        String email,
        String address,
        String documentType
) {

}
