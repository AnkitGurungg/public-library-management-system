package com.csplms.service.Member;

import com.csplms.dto.requestDto.KhaltiPaymentInitiateRequestDto;
import com.csplms.dto.requestDto.KhaltiPaymentVerificationRequestDto;
import com.csplms.dto.responseDto.KhaltiPaymentInitiateResponseDto;
import com.csplms.dto.responseDto.KhaltiPaymentVerificationResponseDto;
import com.csplms.exception.MailFailedException;
import jakarta.mail.MessagingException;
import org.springframework.transaction.annotation.Transactional;

public interface MemberPaymentService {
    KhaltiPaymentInitiateResponseDto initiateFinePayment(KhaltiPaymentInitiateRequestDto khaltiPaymentInitiateRequestDto);

    @Transactional(rollbackFor = {MessagingException.class, MailFailedException.class, Exception.class})
    KhaltiPaymentVerificationResponseDto verifyKhaltiPayment(KhaltiPaymentVerificationRequestDto verificationRequestDto) throws MessagingException, MailFailedException;
}
