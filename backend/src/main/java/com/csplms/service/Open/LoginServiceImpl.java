package com.csplms.service.Open;

import com.csplms.dto.responseDto.GetUserResponseDto;
import com.csplms.entity.Evidence;
import com.csplms.entity.User;
import com.csplms.dto.requestDto.LoginRequestDto;
import com.csplms.dto.responseDto.LoginResponseDto;
import com.csplms.exception.MailFailedException;
import com.csplms.exception.UnauthorizedException;
import com.csplms.exception.UserNotPresentException;
import com.csplms.mapper.LoginMapper;
import com.csplms.repository.EvidenceRepository;
import com.csplms.repository.UserRepository;
import com.csplms.security.JwtService;
import com.csplms.security.UserDetailsServiceImpl;
import com.csplms.util.DateTimeUtil;
import com.csplms.util.EmailUtil;
import com.csplms.util.OtpUtil;
import jakarta.mail.MessagingException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

@Service
public class LoginServiceImpl implements LoginService {

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

    @Autowired
    public LoginServiceImpl(UserRepository userRepository, EvidenceRepository evidenceRepository, UserDetailsServiceImpl userDetailsService, LoginMapper loginMapper, JwtService jwtService, AuthenticationManager authenticationManager, EmailUtil emailUtil, OtpUtil otpUtil, DateTimeUtil dateTimeUtil, PasswordEncoder passwordEncoder) {
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
    }

    @Override
    public LoginResponseDto loginUser(LoginRequestDto loginRequestDto) throws MessagingException, MailFailedException {
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
    public GetUserResponseDto getUser(String rawToken) {
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

}
