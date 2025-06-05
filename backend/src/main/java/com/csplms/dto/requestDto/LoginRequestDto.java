package com.csplms.dto.requestDto;

import lombok.NonNull;

public record LoginRequestDto(
        @NonNull String email,
        @NonNull String password
) {

}