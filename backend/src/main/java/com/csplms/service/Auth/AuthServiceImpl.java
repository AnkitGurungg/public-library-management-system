package com.csplms.service.Auth;

import com.csplms.dto.requestDto.LogoutRequestDto;
import com.csplms.dto.requestDto.RefreshTokenRequestDTO;
import com.csplms.dto.responseDto.GetUserResponseDto;
import com.csplms.entity.Evidence;
import com.csplms.entity.RefreshToken;
import com.csplms.entity.User;
import com.csplms.dto.requestDto.LoginRequestDto;
import com.csplms.dto.responseDto.LoginResponseDto;
import com.csplms.exception.MailFailedException;
import com.csplms.exception.UnauthorizedException;
import com.csplms.exception.UserNotPresentException;
import com.csplms.mapper.LoginMapper;
import com.csplms.repository.EvidenceRepository;
import com.csplms.repository.RefreshTokenRepository;
import com.csplms.repository.UserRepository;
import com.csplms.security.JwtService;
import com.csplms.security.UserDetailsServiceImpl;
import com.csplms.util.DateTimeUtil;
import com.csplms.util.EmailUtil;
import com.csplms.util.GetAuthUserUtil;
import com.csplms.util.OtpUtil;
import jakarta.mail.MessagingException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import java.util.HashMap;
import java.util.Map;

@Service
public class AuthServiceImpl implements AuthService {

    private final JwtService jwtService;
    private final UserRepository userRepository;
    private final EvidenceRepository evidenceRepository;
    private final UserDetailsServiceImpl userDetailsService;
    private final LoginMapper loginMapper;
    private final AuthenticationManager authenticationManager;
    private final EmailUtil emailUtil;
    private final OtpUtil otpUtil;
    private final DateTimeUtil dateTimeUtil;
    private final PasswordEncoder passwordEncoder;
    private final GetAuthUserUtil authUserUtil;
    private final RefreshTokenService refreshTokenService;
    private final RefreshTokenRepository refreshTokenRepository;

    @Autowired
    public AuthServiceImpl(UserRepository userRepository, EvidenceRepository evidenceRepository, UserDetailsServiceImpl userDetailsService, LoginMapper loginMapper, JwtService jwtService, AuthenticationManager authenticationManager, EmailUtil emailUtil, OtpUtil otpUtil, DateTimeUtil dateTimeUtil, PasswordEncoder passwordEncoder, GetAuthUserUtil authUserUtil, RefreshTokenService refreshTokenService, RefreshTokenRepository refreshTokenRepository) {
        this.userRepository = userRepository;
        this.evidenceRepository = evidenceRepository;
        this.userDetailsService = userDetailsService;
        this.loginMapper = loginMapper;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
        this.emailUtil = emailUtil;
        this.otpUtil = otpUtil;
        this.dateTimeUtil = dateTimeUtil;
        this.passwordEncoder = passwordEncoder;
        this.authUserUtil = authUserUtil;
        this.refreshTokenService = refreshTokenService;
        this.refreshTokenRepository = refreshTokenRepository;
    }

    @Override
    public LoginResponseDto login(LoginRequestDto loginRequestDto) throws MessagingException, MailFailedException {
        String otp = otpUtil.generateOTP();
        final String accessToken = jwtService.generateToken(loginRequestDto.email());
        final String refreshToken = jwtService.generateRefreshToken(loginRequestDto.email());

//        check user presence on db
        User user = this.userRepository.findUserByEmail(loginRequestDto.email())
                .orElseThrow(() -> new UserNotPresentException("User not found"));
        if(!user.isPresent()){
            throw new UserNotPresentException("You are no longer user!!!");
        }

//        authenticate user
        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                loginRequestDto.email(),
                loginRequestDto.password()
        );
        Authentication authentication = authenticationManager.authenticate(authToken);

//        extra validation
        if (!authentication.isAuthenticated()) {
            throw new UnauthorizedException("Invalid username or password");
        }

//        if user has not verified email, then again send otp and ask to verify email
        if (!user.isActive()) {
            emailUtil.sendOtpEmail(loginRequestDto.email(), otp);
            user.setOtpGeneratedTime(dateTimeUtil.getLocalDateTime());
            user.setOtp(passwordEncoder.encode(otp));
            userRepository.save(user);
            return new LoginResponseDto(user.getUserId(), user.getEmail(), user.getRoles(), accessToken, refreshToken, user.isVerified(), user.isPresent(), user.isActive());
        }

        if (authentication.isAuthenticated() && user.isActive() && user.isPresent()) {
//            final String accessToken = jwtService.generateToken(loginRequestDto.email());
//            final String refreshToken = jwtService.generateRefreshToken(loginRequestDto.email());
            return this.loginMapper.toLoginResponseDto(user, accessToken, refreshToken);
        }
        else {
            throw new UnauthorizedException("Invalid username or password");
        }
    }

    @Override
    public GetUserResponseDto me(String rawToken) {
        if (rawToken != null){
            final String token = rawToken.substring(7);
            final String username = jwtService.extractUsername(token);

            User user = this.userDetailsService.loadUserByUsernameForToken(username);
            Evidence evidence = evidenceRepository.findByUserId(user.getUserId());

            return new GetUserResponseDto(
                    user.getUserId(),
                    user.getName(),
                    user.getEmail(),
                    user.getRoles(),
                    evidence,
                    token,
                    user.isVerified(),
                    user.isPresent(),
                    user.isActive()
            );
        } else {
            return new GetUserResponseDto(
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    false,
                    false,
                    false
            );
        }
    }

    @Override
    public Map<String, String> refreshToken(String rawRefreshToken) {
        // Remove "Bearer " prefix if present
        String refreshToken = rawRefreshToken;
        if (rawRefreshToken.startsWith("Bearer ")) {
            refreshToken = rawRefreshToken.substring(7);
        }

        // Extract username from token
        String username = jwtService.extractUsername(refreshToken);

        // Verify refresh token in DB
        RefreshToken oldRefToken = refreshTokenService.verifyRefreshToken(refreshToken, username);

        // Revoke old token
        oldRefToken.setRevoked(true);
        refreshTokenRepository.save(oldRefToken);

        // Generate new token
        String newAccessToken = jwtService.refreshToken(refreshToken);
        String newRefreshToken = jwtService.generateRefreshToken(username);

        // Save new refresh token
        refreshTokenService.create(username, newRefreshToken);

        Map<String, String> response = new HashMap<>();
        response.put("Authorization", newAccessToken);
        response.put("refreshToken", newRefreshToken);

        return response;
    }

    @Override
    public String logout(LogoutRequestDto requestDto) {
        refreshTokenService.revokeRefreshToken(requestDto.refreshToken());
        return "Logged out successfully";
    }

    @Override
    public String logoutAll() {
        String email = authUserUtil.getAuthUser();
        User user = userRepository.findUserByEmail(email).orElseThrow(()-> new UserNotPresentException("User not found"));
        refreshTokenService.revokeAllUserTokens(user);
        return "Logged out from all devices";
    }

}
