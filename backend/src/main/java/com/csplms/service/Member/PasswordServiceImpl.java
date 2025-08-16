package com.csplms.service.Member;

import com.csplms.dto.requestDto.ChangePasswordRequestDto;
import com.csplms.dto.requestDto.ForgotPasswordRequestDto;
import com.csplms.entity.User;
import com.csplms.exception.MailFailedException;
import com.csplms.exception.PasswordNotMatchedException;
import com.csplms.exception.UserNotPresentException;
import com.csplms.repository.UserRepository;
import com.csplms.util.DateTimeUtil;
import com.csplms.util.EmailService;
import com.csplms.util.GetAuthUserUtil;
import com.csplms.util.OtpUtil;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class PasswordServiceImpl implements PasswordService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final GetAuthUserUtil getAuthUserUtil;
    private final OtpUtil otpUtil;
    private final DateTimeUtil dateTimeUtil;
    private final EmailService emailService;

    @Autowired
    public PasswordServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder, GetAuthUserUtil getAuthUserUtil, OtpUtil otpUtil, DateTimeUtil dateTimeUtil, EmailService emailService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.getAuthUserUtil = getAuthUserUtil;
        this.otpUtil = otpUtil;
        this.dateTimeUtil = dateTimeUtil;
        this.emailService = emailService;
    }

    @Override
    public String changePassword(ChangePasswordRequestDto changePasswordRequestDto) {
        User user = this.userRepository.findUserByEmail(getAuthUserUtil.getAuthUser()).orElseThrow(() -> new UserNotPresentException("User not found"));
        boolean matches = passwordEncoder.matches(changePasswordRequestDto.oldPassword(), user.getPassword());

        if (!matches) {
            throw new PasswordNotMatchedException("Incorrect old password.");
        }
        user.setPassword(passwordEncoder.encode(changePasswordRequestDto.newPassword()));
        this.userRepository.save(user);
        userRepository.flush();
        return "Password changed.";
    }

    @Override
    public String forgotPassword(ForgotPasswordRequestDto forgotPasswordRequestDto) throws MessagingException, MailFailedException {
        User user = this.userRepository.findUserByEmail(getAuthUserUtil.getAuthUser()).orElseThrow(() -> new UserNotPresentException("User not found"));
        String otp = otpUtil.generateOTP();
        user.setOtp(otp);
        user.setOtpGeneratedTime(dateTimeUtil.getLocalDateTime());
        userRepository.save(user);
        emailService.sendOtpEmail(forgotPasswordRequestDto.email(), otp);
        return "OTP sent to your mail!";
    }

}
