package com.csplms.controller.Auth;

import com.csplms.dto.requestDto.KYCFillUpDto;
import com.csplms.entity.User;
import com.csplms.security.JwtService;
import com.csplms.exception.MailFailedException;
import com.csplms.util.GetAuthUserUtil;
import jakarta.mail.MessagingException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpHeaders;
import com.csplms.service.Auth.RegistrationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.csplms.dto.responseDto.UserResponseDto;
import com.csplms.dto.requestDto.VerifyOtpRequestDto;
import org.springframework.web.multipart.MultipartFile;
import com.csplms.dto.requestDto.RegistrationRequestDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;

@RestController
@RequestMapping("/auth")
public class RegistrationController {

    private final JwtService jwtService;
    private final RegistrationService registrationService;
    private final GetAuthUserUtil getAuthUserUtil;

    private static final Logger logger = LoggerFactory.getLogger(RegistrationController.class);

    @Autowired
    public RegistrationController(RegistrationService registrationService, JwtService jwtService, GetAuthUserUtil getAuthUserUtil) {
        this.registrationService = registrationService;
        this.jwtService = jwtService;
        this.getAuthUserUtil = getAuthUserUtil;
    }

    @PostMapping("/register")
    public ResponseEntity<User> registerMemberUser(@RequestBody RegistrationRequestDto registrationRequestDto) throws MailFailedException, MessagingException {
        String jwtToken = jwtService.generateToken(registrationRequestDto.email());
        String refreshToken = jwtService.generateRefreshToken(registrationRequestDto.email());

        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", jwtToken);
        headers.add("refreshToken", refreshToken);
        return new ResponseEntity<>(registrationService.registerMemberUser(registrationRequestDto), headers, HttpStatus.CREATED);
    }

    @PreAuthorize("hasAnyAuthority('ROLE_MEMBER', 'ROLE_LIBRARIAN', 'ROLE_ADMIN')")
    @PostMapping("/v1/verify/otp")
    public ResponseEntity<String> verifyOTP(
            @RequestBody VerifyOtpRequestDto verifyOtpRequestDto
    ) {
        final String email = getAuthUserUtil.getAuthUser();
        logger.warn("email: {}", email);
        return new ResponseEntity<>(registrationService.verifyOTP(verifyOtpRequestDto, email), HttpStatus.OK);
    }

    @PreAuthorize("hasAnyAuthority('ROLE_MEMBER', 'ROLE_LIBRARIAN', 'ROLE_ADMIN')")
    @GetMapping("/v1/regenerate-otp")
    public ResponseEntity<String> regenerateOTP() throws MailFailedException, MessagingException {
        return new ResponseEntity<>(registrationService.regenerateOTP(), HttpStatus.OK);
    }

    @PreAuthorize("hasAnyAuthority('ROLE_MEMBER', 'ROLE_LIBRARIAN', 'ROLE_ADMIN')")
    @PostMapping("/v1/kyc")
    public ResponseEntity<UserResponseDto> registerMemberUserKYC(
            @RequestPart KYCFillUpDto kycFillUpDto,
            @RequestPart MultipartFile userImage,
            @RequestPart MultipartFile[] evidenceImages
    ) {
        return new ResponseEntity<>(registrationService.submitKycForm(kycFillUpDto, userImage, evidenceImages), HttpStatus.CREATED);
    }

}
