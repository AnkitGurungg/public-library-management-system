package com.csplms.controller.Member;

import com.csplms.dto.requestDto.ChangePasswordRequestDto;
import com.csplms.dto.requestDto.ForgotPasswordRequestDto;
import com.csplms.exception.MailFailedException;
import com.csplms.service.Member.PasswordService;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/mla")
@PreAuthorize("hasAnyAuthority('ROLE_MEMBER', 'ROLE_LIBRARIAN', 'ROLE_ADMIN')")
public class PasswordController {

    private final PasswordService passwordService;

    @Autowired
    public PasswordController(PasswordService passwordService) {
        this.passwordService = passwordService;
    }

    @PutMapping("/password/change")
    public ResponseEntity<String> changePassword(@RequestBody ChangePasswordRequestDto changePasswordRequestDto) {
        return new ResponseEntity<>(this.passwordService.changePassword(changePasswordRequestDto), HttpStatus.OK);
    }

    @PutMapping("/forgot/password")
    public ResponseEntity<String> forgotPassword(@RequestBody ForgotPasswordRequestDto forgotPasswordRequestDto) throws MessagingException, MailFailedException {
        return new ResponseEntity<>(this.passwordService.forgotPassword(forgotPasswordRequestDto), HttpStatus.OK);
    }

}
