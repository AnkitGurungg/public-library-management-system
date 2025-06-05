package com.csplms.dto.responseDto;

import java.sql.Date;

public record UserAccountInfoDto(
        Integer userId,
        String name,
        String email,
        String contactNumber,
        String address,
        Date appliedDate,
        Date verifiedDate,
        boolean verified,
        boolean profileUpdated,
        boolean present,
        EvidenceDto evidence
) {

}
