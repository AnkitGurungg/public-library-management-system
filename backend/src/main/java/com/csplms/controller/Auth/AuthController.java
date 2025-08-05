package com.csplms.controller.Auth;

import com.csplms.dto.requestDto.LogoutRequestDto;
import com.csplms.entity.RefreshToken;
import com.csplms.entity.User;
import com.csplms.exception.UserNotPresentException;
import com.csplms.repository.RefreshTokenRepository;
import com.csplms.repository.UserRepository;
import com.csplms.service.Auth.RefreshTokenService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.csplms.security.JwtService;
import jakarta.mail.MessagingException;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpHeaders;
import com.csplms.service.Auth.AuthService;
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

    private final AuthService authService;
    private final JwtService jwtService;
    private final UserRepository userRepository;
    private final RefreshTokenService refreshTokenService;
    private final RefreshTokenRepository refreshTokenRepository;

    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);

    @Autowired
    public AuthController(AuthService authService, JwtService jwtService, RefreshTokenService refreshTokenService, UserRepository userRepository, RefreshTokenRepository refreshTokenRepository) {
        this.authService = authService;
        this.jwtService = jwtService;
        this.refreshTokenService = refreshTokenService;
        this.userRepository = userRepository;
        this.refreshTokenRepository = refreshTokenRepository;
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDto> login(@RequestBody LoginRequestDto loginRequestDto, HttpServletRequest request) throws MessagingException, MailFailedException {
        LoginResponseDto loginResponseDto = authService.login(loginRequestDto);

        if (loginResponseDto.present() && !loginResponseDto.active()){
            return new ResponseEntity<>(loginResponseDto, HttpStatus.NON_AUTHORITATIVE_INFORMATION);
        }

        if (loginResponseDto.accessToken() == null) {
            throw new UnauthorizedException("Invalid username or password");
        }
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", loginResponseDto.accessToken());
        headers.add("refreshToken", loginResponseDto.refreshToken());

        User user = userRepository.findById(loginResponseDto.userId()).orElseThrow(()-> new UserNotPresentException("User not found"));
        refreshTokenService.create(user, loginResponseDto.refreshToken());

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

            // Verify with db data
            RefreshToken oldToken = refreshTokenService.verifyRefreshToken(refreshToken, username);

            // If token is reusable, it is revoked
            oldToken.setRevoked(true);
            refreshTokenRepository.save(oldToken);

            // Save new refresh token
            refreshTokenService.create(oldToken.getUser(), newRefreshToken);

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

    @PostMapping("/logout")
    public ResponseEntity<String> logout(@RequestBody LogoutRequestDto requestDto) {
        return new ResponseEntity<>(authService.logout(requestDto), HttpStatus.OK);
    }

    @PostMapping("/logout-all")
    public ResponseEntity<String> logoutAll() {
        return new ResponseEntity<>(authService.logoutAll(), HttpStatus.OK);
    }

}
