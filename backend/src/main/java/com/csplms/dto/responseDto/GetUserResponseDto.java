package com.csplms.dto.responseDto;

import com.csplms.entity.Evidence;

public record GetUserResponseDto(
        Integer userId,
        String name,
        String email,
        String role,
        Evidence evidence,
        String accessToken,
        boolean verified,
        boolean present,
        boolean active
) {

}
