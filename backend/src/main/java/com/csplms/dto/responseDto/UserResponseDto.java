package com.csplms.dto.responseDto;

import java.sql.Date;

public record UserResponseDto(
        Integer userId,
        String name,
        String contactNumber,
        String email,
        String address,
        String password,
        Date appliedDate,
        boolean verified,
        boolean present
){

}
