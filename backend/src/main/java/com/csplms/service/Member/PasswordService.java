package com.csplms.service.Member;

import com.csplms.dto.requestDto.ChangePasswordRequestDto;
import com.csplms.dto.requestDto.ForgotPasswordRequestDto;
import com.csplms.exception.MailFailedException;
import jakarta.mail.MessagingException;

public interface PasswordService {
    String changePassword(ChangePasswordRequestDto changePasswordRequestDto);

    String forgotPassword(ForgotPasswordRequestDto forgotPasswordRequestDto) throws MessagingException, MailFailedException;
}
