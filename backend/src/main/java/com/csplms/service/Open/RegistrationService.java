package com.csplms.service.Open;

import org.slf4j.Logger;
import com.csplms.exception.*;
import com.csplms.entity.User;
import org.slf4j.LoggerFactory;
import com.csplms.util.OtpUtil;
import com.csplms.util.EmailUtil;
import com.csplms.util.DateTimeUtil;
import com.csplms.util.GetAuthUserUtil;
import jakarta.mail.MessagingException;
import com.csplms.repository.UserRepository;
import com.csplms.mapper.RegistrationMapper;
import org.springframework.stereotype.Service;
import com.csplms.dto.requestDto.VerifyOtpRequestDto;
import com.csplms.dto.requestDto.RegistrationRequestDto;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

@Service
public class RegistrationService {

    private final GetAuthUserUtil getAuthUserUtil;
    @Value("${mail.otp.valid-time}")
    private String otpValidTime;

    private final UserRepository userRepository;
    private final RegistrationMapper registrationMapper;
    private final OtpUtil otpUtil;
    private final EmailUtil emailUtil;
    private final DateTimeUtil dateWithTimeUtil;
    private final PasswordEncoder passwordEncoder;

    private static final Logger logger = LoggerFactory.getLogger(RegistrationService.class);

    @Autowired
    public RegistrationService(UserRepository userRepository, RegistrationMapper registrationMapper, OtpUtil otpUtil, EmailUtil emailUtil, DateTimeUtil dateTimeUtil, GetAuthUserUtil getAuthUserUtil, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.registrationMapper = registrationMapper;
        this.otpUtil = otpUtil;
        this.emailUtil = emailUtil;
        this.dateWithTimeUtil = dateTimeUtil;
        this.getAuthUserUtil = getAuthUserUtil;
        this.passwordEncoder = passwordEncoder;
    }

    public User registerMemberUser(RegistrationRequestDto registrationRequestDto) throws MailFailedException, MessagingException {
        try {
            String otp = otpUtil.generateOTP();
            Optional<User> dbUser =  userRepository.findUserByEmail(registrationRequestDto.email());
            if (dbUser.isPresent()) {
                throw new ResourceAlreadyExistsException("User already exists: "+ registrationRequestDto.email());
            }
            emailUtil.sendOtpEmail(registrationRequestDto.email(), otp);
            return userRepository.save(registrationMapper.toUser(registrationRequestDto, otp));
        } catch (Exception ex) {
            if (ex instanceof DataIntegrityViolationException dive
                    && dive.getCause().toString().contains("uk_email")) {
                throw new UniqueKeyViolationException("User already exists: "+ registrationRequestDto.email());
            }
            throw ex;
        }
    }

    public String verifyOTP(VerifyOtpRequestDto verifyOtpRequestDto, String email) {
        User user = userRepository.findUserByEmail(email).orElseThrow(() -> new ResourceEntityNotFoundException("User", "email", 0));

        if (dateWithTimeUtil.getLocalDateTime().isAfter(user.getOtpGeneratedTime().plusSeconds(Long.parseLong(otpValidTime)))) {
            throw new OTPTimeFailedException("OTP Expired, Try regenerating!");
        }

//        Match the otp from db and input otp
        if (passwordEncoder.matches(verifyOtpRequestDto.otp(), user.getOtp())) {
            user.setActive(true);
            userRepository.save(user);
            return "Email verified";
        }
        throw new OTPTimeFailedException("Invalid OTP");
    }

    public String regenerateOTP() throws MailFailedException, MessagingException {
        String otp = otpUtil.generateOTP();
        String email = getAuthUserUtil.getAuthUser();
        User user = userRepository.findUserByEmail(email).orElseThrow(() -> new ResourceEntityNotFoundException("User", "Id", 0));
        user.setOtp(passwordEncoder.encode(otp));
        user.setOtpGeneratedTime(dateWithTimeUtil.getLocalDateTime());
        userRepository.save(user);
        emailUtil.sendOtpEmail(user.getEmail(), otp);
        return "OTP sent again";
    }

}
