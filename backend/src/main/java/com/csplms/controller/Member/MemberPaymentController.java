package com.csplms.controller.Member;

import com.csplms.dto.requestDto.ReceiveKhaltiRequestDto;
import com.csplms.dto.responseDto.InitiateKhaltiSuccessResponse;
import com.csplms.exception.MailFailedException;
import com.csplms.service.Member.MemberPaymentService;
import jakarta.mail.MessagingException;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@EnableMethodSecurity(prePostEnabled = true)
public class MemberPaymentController {

    private final MemberPaymentService memberPaymentService;

    @Autowired
    public MemberPaymentController(MemberPaymentService memberPaymentService) {
        this.memberPaymentService = memberPaymentService;
    }

    @PreAuthorize("hasAnyAuthority('ROLE_MEMBER', 'ROLE_LIBRARIAN', 'ROLE_ADMIN')")
    @PostMapping("/api/v1/m/user/profile/fine/pay")
    public ResponseEntity<InitiateKhaltiSuccessResponse> payFine (@RequestBody ReceiveKhaltiRequestDto receiveKhaltiRequestDto) {
        return new ResponseEntity<>(this.memberPaymentService.payFine(receiveKhaltiRequestDto), HttpStatus.OK);
    }

    @GetMapping(value = "/get/fines/response", consumes = {"text/xml", "*/*"})
    public void getFinesByMember(HttpServletRequest request) throws MessagingException, MailFailedException {
        this.memberPaymentService.getFinesByMember(request);
    }

}
