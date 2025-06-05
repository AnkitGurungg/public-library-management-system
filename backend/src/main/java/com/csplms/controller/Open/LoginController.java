package com.csplms.controller.Open;

import com.csplms.dto.responseDto.GetUserResponseDto;
import com.csplms.exception.MailFailedException;
import jakarta.mail.MessagingException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.csplms.security.JwtService;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpHeaders;
import com.csplms.service.Open.LoginService;
import org.springframework.http.ResponseEntity;
import jakarta.servlet.http.HttpServletRequest;
import com.csplms.dto.requestDto.LoginRequestDto;
import org.springframework.web.bind.annotation.*;
import com.csplms.exception.UnauthorizedException;
import com.csplms.dto.responseDto.LoginResponseDto;
import com.csplms.dto.requestDto.GetUserRequestDto;
import com.csplms.dto.requestDto.RefreshTokenRequestDTO;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Map;
import java.util.HashMap;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/auth")
public class LoginController {

    private final LoginService loginService;
    private final JwtService jwtService;
    private static final Logger logger = LoggerFactory.getLogger(LoginController.class);

    @Autowired
    public LoginController(LoginService loginService, JwtService jwtService) {
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
        return new ResponseEntity<>(loginResponseDto, headers, HttpStatus.OK);
    }

    @PostMapping("/get-user")
    public ResponseEntity<GetUserResponseDto> getUser(@RequestBody GetUserRequestDto getUserRequestDto) {
        return new ResponseEntity<>(loginService.getUser(getUserRequestDto), HttpStatus.OK);
    }

    @PostMapping("/refresh")
    public ResponseEntity<?> refreshToken(@RequestBody RefreshTokenRequestDTO refreshRequest) {
        try {
            // Extract token from request (remove "Bearer " if present)
            String refreshToken = refreshRequest.getRefreshToken();
            if (refreshToken.startsWith("Bearer ")) {
                refreshToken = refreshToken.substring(7);
            }

            // Extract username from token
            String username = jwtService.extractUsername(refreshToken);

            // Generate new access token
            String newAccessToken = jwtService.refreshToken(refreshToken);

            Map<String, String> response = new HashMap<>();
            response.put("accessToken", "Bearer " + newAccessToken);

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
        }
    }

}
