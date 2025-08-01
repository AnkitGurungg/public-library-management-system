package com.csplms.service.Auth;

import com.csplms.dto.requestDto.LoginRequestDto;
import com.csplms.dto.responseDto.GetUserResponseDto;
import com.csplms.dto.responseDto.LoginResponseDto;
import com.csplms.exception.MailFailedException;
import jakarta.mail.MessagingException;

public interface AuthService {
    LoginResponseDto loginUser(LoginRequestDto loginRequestDto) throws MessagingException, MailFailedException;

    GetUserResponseDto getUser(String rawToken);
}
