package com.csplms.service.Open;

import com.csplms.dto.responseDto.GetUserResponseDto;
import com.csplms.entity.User;
import com.csplms.dto.requestDto.LoginRequestDto;
import com.csplms.dto.requestDto.GetUserRequestDto;
import com.csplms.dto.responseDto.LoginResponseDto;
import com.csplms.exception.MailFailedException;
import com.csplms.exception.MailNotVerifiedException;
import com.csplms.exception.UnauthorizedException;
import com.csplms.exception.UserNotPresentException;
import com.csplms.mapper.LoginMapper;
import com.csplms.repository.UserRepository;
import com.csplms.security.JwtService;
import com.csplms.util.DateTimeUtil;
import com.csplms.util.EmailUtil;
import com.csplms.util.OtpUtil;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class LoginService {

    private final JwtService jwtService;
    private final UserRepository userRepository;
    private final LoginMapper loginMapper;
    private final AuthenticationManager authenticationManager;
    private final EmailUtil emailUtil;
    private final OtpUtil otpUtil;
    private final DateTimeUtil dateTimeUtil;

    @Autowired
    public LoginService(UserRepository userRepository, LoginMapper loginMapper, JwtService jwtService, AuthenticationManager authenticationManager, EmailUtil emailUtil, OtpUtil otpUtil, DateTimeUtil dateTimeUtil) {
        this.userRepository = userRepository;
        this.loginMapper = loginMapper;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
        this.emailUtil = emailUtil;
        this.otpUtil = otpUtil;
        this.dateTimeUtil = dateTimeUtil;
    }

    public LoginResponseDto loginUser(LoginRequestDto loginRequestDto) throws MessagingException, MailFailedException {
        String otp = otpUtil.generateOTP();
        final String accessToken = jwtService.generateToken(loginRequestDto.email());
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

        if (!user.isActive()) {
            emailUtil.sendOtpEmail(loginRequestDto.email(), otp);
            user.setOtpGeneratedTime(dateTimeUtil.getLocalDateTime());
            user.setOtp(otp);
            userRepository.save(user);
            return new LoginResponseDto(user.getUserId(), user.getEmail(), user.getRoles(), accessToken ,user.isVerified(), user.isPresent(), user.isActive());
        }

        if (authentication.isAuthenticated() && user.isActive() && user.isPresent()) {
//            final String accessToken = jwtService.generateToken(loginRequestDto.email());
//            final String refreshToken = jwtService.generateRefreshToken(loginRequestDto.email());
            return this.loginMapper.toLoginResponseDto(user, accessToken);
        }
        else {
            throw new UnauthorizedException("Invalid username or password");
        }
    }

    public GetUserResponseDto getUser(GetUserRequestDto getUserRequestDto) {
        return jwtService.getUser(getUserRequestDto);
    }

}
