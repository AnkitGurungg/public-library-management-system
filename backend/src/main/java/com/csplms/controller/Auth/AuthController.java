package com.csplms.controller.Auth;

import com.csplms.dto.requestDto.LogoutRequestDto;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import jakarta.mail.MessagingException;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpHeaders;
import com.csplms.service.Auth.AuthService;
import org.springframework.http.ResponseEntity;
import jakarta.servlet.http.HttpServletRequest;
import com.csplms.dto.requestDto.LoginRequestDto;
import org.springframework.web.bind.annotation.*;
import com.csplms.dto.responseDto.LoginResponseDto;
import com.csplms.exception.MailFailedException;
import com.csplms.dto.responseDto.GetUserResponseDto;
import com.csplms.dto.requestDto.RefreshTokenRequestDTO;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Map;
import java.util.HashMap;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;

    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);

    @Autowired
    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDto> login(@RequestBody LoginRequestDto loginRequestDto, HttpServletRequest request) throws MessagingException, MailFailedException {
        LoginResponseDto loginResponseDto = authService.login(loginRequestDto);

//        Iif user is not deleted but has not verified email
        if (loginResponseDto.present() && !loginResponseDto.active()){
            return new ResponseEntity<>(loginResponseDto, HttpStatus.NON_AUTHORITATIVE_INFORMATION);
        }

        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", loginResponseDto.accessToken());
        headers.add("refreshToken", loginResponseDto.refreshToken());

        return new ResponseEntity<>(loginResponseDto, headers, HttpStatus.OK);
    }

    @GetMapping("/me")
    public ResponseEntity<GetUserResponseDto> me(
            @RequestHeader("Authorization") String rawToken
    ) {
        return new ResponseEntity<>(
                authService.me(rawToken),
                HttpStatus.OK
        );
    }

    @PostMapping("/refresh-token")
    public ResponseEntity<Map<String, String>> refreshToken(
            @RequestBody RefreshTokenRequestDTO refTokenReq
    ) {
        try {
            return new ResponseEntity<>(
                    authService.refreshToken(refTokenReq.refreshToken()),
                    HttpStatus.OK
            );
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return new ResponseEntity<>(error, HttpStatus.UNAUTHORIZED);
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout(@RequestBody LogoutRequestDto requestDto) {
        return new ResponseEntity<>(authService.logout(requestDto), HttpStatus.OK);
    }

    @PostMapping("/logout-all")
    public ResponseEntity<String> logoutAll() {
        return new ResponseEntity<>(authService.logoutAll(), HttpStatus.OK);
    }

}
