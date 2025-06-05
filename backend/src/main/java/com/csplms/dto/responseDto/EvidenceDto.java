package com.csplms.dto.responseDto;

public record EvidenceDto(
        Integer evidenceId,
        String userImage,
        String evidenceOne,
        String evidenceTwo,
        String documentType,
        String description
) {

}
