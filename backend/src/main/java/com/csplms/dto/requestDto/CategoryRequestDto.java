package com.csplms.dto.requestDto;

public record CategoryRequestDto(
        String name,
        String startingNumber,
        String endingNumber,
        String description
){

}
