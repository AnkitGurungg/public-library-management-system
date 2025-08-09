package com.csplms.service.Auth;

import com.csplms.dto.requestDto.KYCFillUpDto;
import com.csplms.dto.requestDto.RegistrationRequestDto;
import com.csplms.dto.requestDto.VerifyOtpRequestDto;
import com.csplms.dto.responseDto.UserResponseDto;
import com.csplms.exception.MailFailedException;
import jakarta.mail.MessagingException;
import jakarta.transaction.Transactional;
import org.springframework.web.multipart.MultipartFile;

public interface RegistrationService {
    void registerMember(RegistrationRequestDto registrationRequestDto, String token) throws MailFailedException, MessagingException;

    String verifyOTP(VerifyOtpRequestDto verifyOtpRequestDto, String email);

    String regenerateOTP() throws MailFailedException, MessagingException;

    @Transactional
    UserResponseDto submitKycForm(KYCFillUpDto kycFillUpDto, MultipartFile memberUserImage, MultipartFile[] memberUserEvidences);
}
