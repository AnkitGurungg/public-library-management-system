package com.csplms.controller.Auth;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.csplms.security.JwtService;
import jakarta.mail.MessagingException;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpHeaders;
import com.csplms.service.Auth.LoginService;
import org.springframework.http.ResponseEntity;
import jakarta.servlet.http.HttpServletRequest;
import com.csplms.dto.requestDto.LoginRequestDto;
import org.springframework.web.bind.annotation.*;
import com.csplms.exception.UnauthorizedException;
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

    private final LoginService loginService;
    private final JwtService jwtService;
    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);

    @Autowired
    public AuthController(LoginService loginService, JwtService jwtService) {
        this.loginService = loginService;
        this.jwtService = jwtService;
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDto> loginUser(@RequestBody LoginRequestDto loginRequestDto, HttpServletRequest request) throws MessagingException, MailFailedException {
        LoginResponseDto loginResponseDto = loginService.loginUser(loginRequestDto);

        if (loginResponseDto.present() && !loginResponseDto.active()){
            return new ResponseEntity<>(loginResponseDto, HttpStatus.NON_AUTHORITATIVE_INFORMATION);
        }

        if (loginResponseDto.accessToken() == null) {
            throw new UnauthorizedException("Invalid username or password");
        }
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", loginResponseDto.accessToken());
        headers.add("refreshToken", loginResponseDto.refreshToken());
        return new ResponseEntity<>(loginResponseDto, headers, HttpStatus.OK);
    }

    @GetMapping("/me")
    public ResponseEntity<GetUserResponseDto> getUser(
            @RequestHeader("Authorization") String rawToken
    ) {
        return new ResponseEntity<>(
                loginService.getUser(rawToken),
                HttpStatus.OK
        );
    }

    @PostMapping("/refresh-token")
    public ResponseEntity<?> refreshToken(@RequestBody RefreshTokenRequestDTO refTokenReq) {
        try {
            // Extract token from request (remove "Bearer " if present)
            String refreshToken = refTokenReq.refreshToken();
            if (refreshToken.startsWith("Bearer ")) {
                refreshToken = refreshToken.substring(7);
            }

            // Extract username from token
            String username = jwtService.extractUsername(refreshToken);

            // Generate both new access and refresh token
            String newAccessToken = jwtService.refreshToken(refreshToken);
            String newRefreshToken = jwtService.generateRefreshToken(username);

            Map<String, String> response = new HashMap<>();
            response.put("Authorization", newAccessToken);
            response.put("refreshToken", newRefreshToken);

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
        }
    }

}
