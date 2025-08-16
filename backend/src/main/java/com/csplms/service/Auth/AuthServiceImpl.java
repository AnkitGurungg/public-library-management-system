package com.csplms.service.Auth;

import com.csplms.dto.requestDto.LogoutRequestDto;
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
import com.csplms.util.EmailService;
import com.csplms.util.GetAuthUserUtil;
import com.csplms.util.OtpUtil;
import jakarta.mail.MessagingException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.transaction.annotation.Transactional;

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
    private final EmailService emailService;
    private final OtpUtil otpUtil;
    private final DateTimeUtil dateTimeUtil;
    private final PasswordEncoder passwordEncoder;
    private final GetAuthUserUtil authUserUtil;
    private final RefreshTokenService refreshTokenService;
    private final RefreshTokenRepository refreshTokenRepository;

    @Autowired
    public AuthServiceImpl(UserRepository userRepository, EvidenceRepository evidenceRepository, UserDetailsServiceImpl userDetailsService, LoginMapper loginMapper, JwtService jwtService, AuthenticationManager authenticationManager, EmailService emailService, OtpUtil otpUtil, DateTimeUtil dateTimeUtil, PasswordEncoder passwordEncoder, GetAuthUserUtil authUserUtil, RefreshTokenService refreshTokenService, RefreshTokenRepository refreshTokenRepository) {
        this.userRepository = userRepository;
        this.evidenceRepository = evidenceRepository;
        this.userDetailsService = userDetailsService;
        this.loginMapper = loginMapper;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
        this.emailService = emailService;
        this.otpUtil = otpUtil;
        this.dateTimeUtil = dateTimeUtil;
        this.passwordEncoder = passwordEncoder;
        this.authUserUtil = authUserUtil;
        this.refreshTokenService = refreshTokenService;
        this.refreshTokenRepository = refreshTokenRepository;
    }

    @Override
    @Transactional(rollbackFor = {Exception.class})
    public LoginResponseDto login(LoginRequestDto loginRequestDto) throws MessagingException, MailFailedException {
//        check user exists
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

//        Generate tokens
        final String accessToken = jwtService.generateToken(loginRequestDto.email());
        final String refreshToken = jwtService.generateRefreshToken(loginRequestDto.email());

//        if user has not verified email, send otp and ask to verify email
        if (!user.isActive()) {
            String otp = otpUtil.generateOTP();
            emailService.sendOtpEmail(loginRequestDto.email(), otp);

            user.setOtpGeneratedTime(dateTimeUtil.getLocalDateTime());
            user.setOtp(passwordEncoder.encode(otp));
            userRepository.save(user);
        }

//        Save refresh token
        refreshTokenService.create(user.getEmail(), refreshToken);
        return new LoginResponseDto(user.getUserId(), user.getEmail(), user.getRoles(), accessToken, refreshToken, user.isVerified(), user.isPresent(), user.isActive());
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
        RefreshToken oldRefToken = refreshTokenService.verifyAndGet(refreshToken);

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
        String rawToken = requestDto.refreshToken();
        RefreshToken token = refreshTokenService.verifyAndGet(rawToken);
        refreshTokenService.revoke(token);

        return "Logged out successfully";
    }

    @Override
    public String logoutAll() {
        String email = authUserUtil.getAuthUser();
        User user = userRepository.findUserByEmail(email)
                .orElseThrow(()-> new UserNotPresentException("User not found"));

        refreshTokenService.revokeAll(user);

        return "Logged out from all devices";
    }

}
