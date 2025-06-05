package com.csplms.dto.requestDto;

public record ChangePasswordRequestDto(
        String oldPassword,
        String newPassword
) {

}
