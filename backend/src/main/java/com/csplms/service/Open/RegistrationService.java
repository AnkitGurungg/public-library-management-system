package com.csplms.service.Open;

import com.csplms.dto.requestDto.RegistrationRequestDto;
import com.csplms.dto.requestDto.VerifyOtpRequestDto;
import com.csplms.entity.User;
import com.csplms.exception.MailFailedException;
import jakarta.mail.MessagingException;

public interface RegistrationService {
    User registerMemberUser(RegistrationRequestDto registrationRequestDto) throws MailFailedException, MessagingException;

    String verifyOTP(VerifyOtpRequestDto verifyOtpRequestDto, String email);

    String regenerateOTP() throws MailFailedException, MessagingException;
}
