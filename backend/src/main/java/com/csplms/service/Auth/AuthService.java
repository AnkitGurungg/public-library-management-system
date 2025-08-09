package com.csplms.service.Auth;

import com.csplms.dto.requestDto.LoginRequestDto;
import com.csplms.dto.requestDto.LogoutRequestDto;
import com.csplms.dto.responseDto.GetUserResponseDto;
import com.csplms.dto.responseDto.LoginResponseDto;
import com.csplms.exception.MailFailedException;
import jakarta.mail.MessagingException;
import org.springframework.transaction.annotation.Transactional;

import java.util.Map;

public interface AuthService {
    @Transactional(rollbackFor = {Exception.class})
    LoginResponseDto login(LoginRequestDto loginRequestDto) throws MessagingException, MailFailedException;

    GetUserResponseDto me(String rawToken);

    Map<String, String> refreshToken(String rawRefreshToken);

    String logout(LogoutRequestDto requestDto);

    String logoutAll();
}
