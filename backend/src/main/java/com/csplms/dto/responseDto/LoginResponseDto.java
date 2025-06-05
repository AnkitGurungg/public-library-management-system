package com.csplms.dto.responseDto;

public record LoginResponseDto (
        Integer userId,
        String email,
        String role,
        String accessToken,
        boolean verified,
        boolean present,
        boolean active
){

}
