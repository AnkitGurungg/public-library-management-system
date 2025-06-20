package com.csplms.controller.Member;

import com.csplms.dto.requestDto.KhaltiPaymentInitiateRequestDto;
import com.csplms.dto.responseDto.KhaltiPaymentInitiateResponseDto;
import com.csplms.dto.requestDto.KhaltiPaymentVerificationRequestDto;
import com.csplms.dto.responseDto.KhaltiPaymentVerificationResponseDto;
import com.csplms.exception.MailFailedException;
import com.csplms.service.Member.MemberPaymentService;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;

@CrossOrigin("*")
@RestController
@EnableMethodSecurity(prePostEnabled = true)
@PreAuthorize("hasAnyAuthority('ROLE_MEMBER', 'ROLE_LIBRARIAN', 'ROLE_ADMIN')")
public class MemberPaymentController {

    private final MemberPaymentService memberPaymentService;

    @Autowired
    public MemberPaymentController(MemberPaymentService memberPaymentService) {
        this.memberPaymentService = memberPaymentService;
    }

    @PostMapping("/api/v1/mla/payments/khalti/initiate")
    public ResponseEntity<KhaltiPaymentInitiateResponseDto> initiateFinePayment(@RequestBody KhaltiPaymentInitiateRequestDto khaltiPaymentInitiateRequestDto) {
        return new ResponseEntity<>(this.memberPaymentService.initiateFinePayment(khaltiPaymentInitiateRequestDto), HttpStatus.OK);
    }

    @PostMapping(value = "api/v1/mla/payments/khalti/verify")
    public ResponseEntity<KhaltiPaymentVerificationResponseDto> verifyKhaltiPayment(@RequestBody KhaltiPaymentVerificationRequestDto khaltiPaymentVerificationRequestDto) throws MessagingException, MailFailedException {
        return new ResponseEntity<>(this.memberPaymentService.verifyKhaltiPayment(khaltiPaymentVerificationRequestDto), HttpStatus.OK);
    }

}
