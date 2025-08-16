package com.csplms.service.Auth;

import com.csplms.dto.requestDto.KYCFillUpDto;
import com.csplms.dto.responseDto.UserResponseDto;
import com.csplms.helper.SaveEvidencesHelper;
import com.csplms.util.EmailService;
import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import com.csplms.exception.*;
import com.csplms.entity.User;
import org.slf4j.LoggerFactory;
import com.csplms.util.OtpUtil;
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
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.Optional;

@Service
public class RegistrationServiceImpl implements RegistrationService {

    @Value("${mail.otp.valid-time}")
    private String otpValidTime;

    private final UserRepository userRepository;
    private final RegistrationMapper registrationMapper;
    private final OtpUtil otpUtil;
    private final EmailService emailService;
    private final DateTimeUtil dateWithTimeUtil;
    private final GetAuthUserUtil getAuthUserUtil;
    private final PasswordEncoder passwordEncoder;
    private final SaveEvidencesHelper saveEvidencesHelper;
    private final RefreshTokenService refreshTokenService;

    private static final Logger logger = LoggerFactory.getLogger(RegistrationServiceImpl.class);

    @Autowired
    public RegistrationServiceImpl(
            UserRepository userRepository,
            RegistrationMapper registrationMapper,
            OtpUtil otpUtil,
            EmailService emailService,
            DateTimeUtil dateTimeUtil,
            GetAuthUserUtil getAuthUserUtil,
            PasswordEncoder passwordEncoder,
            SaveEvidencesHelper saveEvidencesHelper,
            RefreshTokenService refreshTokenService
    ) {
        this.userRepository = userRepository;
        this.registrationMapper = registrationMapper;
        this.otpUtil = otpUtil;
        this.emailService = emailService;
        this.dateWithTimeUtil = dateTimeUtil;
        this.getAuthUserUtil = getAuthUserUtil;
        this.passwordEncoder = passwordEncoder;
        this.saveEvidencesHelper = saveEvidencesHelper;
        this.refreshTokenService = refreshTokenService;
    }

    @Override
    public void registerMember(RegistrationRequestDto registrationRequestDto, String refToken) throws MailFailedException, MessagingException {
        try {
            String otp = otpUtil.generateOTP();
            Optional<User> dbUser =  userRepository.findUserByEmail(registrationRequestDto.email());
            if (dbUser.isPresent()) {
                throw new ResourceAlreadyExistsException("User already exists: "+ registrationRequestDto.email());
            }
            emailService.sendOtpEmail(registrationRequestDto.email(), otp);

//            Save user
            User user = registrationMapper.toUser(registrationRequestDto, otp);
            user = userRepository.saveAndFlush(user);

//            Save token
            refreshTokenService.create(user.getEmail(), refToken);
        } catch (Exception ex) {
            if (ex instanceof DataIntegrityViolationException dive
                    && dive.getCause().toString().contains("uk_users_email")) {
                throw new UniqueKeyViolationException("User already exists: "+ registrationRequestDto.email());
            }
            throw ex;
        }
    }

    @Override
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

    @Override
    public String regenerateOTP() throws MailFailedException, MessagingException {
        String otp = otpUtil.generateOTP();
        String email = getAuthUserUtil.getAuthUser();
        User user = userRepository.findUserByEmail(email).orElseThrow(() -> new ResourceEntityNotFoundException("User", "Id", 0));
        user.setOtp(passwordEncoder.encode(otp));
        user.setOtpGeneratedTime(dateWithTimeUtil.getLocalDateTime());
        userRepository.save(user);
        emailService.sendOtpEmail(user.getEmail(), otp);
        return "OTP sent again";
    }

    @Transactional
    @Override
    public UserResponseDto submitKycForm(KYCFillUpDto kycFillUpDto, MultipartFile memberUserImage, MultipartFile[] memberUserEvidences) {
        String email = getAuthUserUtil.getAuthUser();
        User memberUser = userRepository.findUserByEmail(email).orElseThrow(() -> new UserNotPresentException("user"));

        memberUser = this.registrationMapper.toMemberUser(memberUser, kycFillUpDto);
        memberUser = this.userRepository.save(memberUser);

        // Saves the image and returns the path where evidence is saved
        String memberUserImagePath = this.saveEvidencesHelper.saveUserImageEvidence(memberUser, memberUserImage);
        ArrayList<String> memberUserEvidencesPath = this.saveEvidencesHelper.saveUserEvidences(memberUser, memberUserEvidences);

        // Save the Evidence on DB
        saveEvidencesHelper.saveUserEvidencesOnDB(memberUser, memberUserImagePath, memberUserEvidencesPath, kycFillUpDto);
        return registrationMapper.toUserResponseDto(memberUser);
    }

}
