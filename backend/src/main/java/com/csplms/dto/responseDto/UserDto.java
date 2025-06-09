package com.csplms.dto.responseDto;

import java.sql.Date;

public record UserDto(
        Integer userId,
        String name,
        String email,
        String address,
        Date appliedDate,
        Date verifiedDate,
        String contactNumber,
        boolean verified,
        boolean present,
        boolean active,
        EvidenceDto evidence
) {

}
