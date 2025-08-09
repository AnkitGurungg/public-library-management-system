package com.csplms.data;

import com.csplms.entity.Evidence;
import com.csplms.entity.User;
import com.csplms.enums.RolesEnum;
import com.csplms.repository.EvidenceRepository;
import com.csplms.repository.UserRepository;
import com.csplms.util.DateTimeUtil;
import com.csplms.util.GlobalDateUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class AdminSeeder implements ApplicationRunner {

//    Admin
    @Value("${admin.name}")
    private String aName;

    @Value("${admin.contact}")
    private String aContactNumber;

    @Value("${admin.email}")
    private String aEmail;

    @Value("${admin.password}")
    private String aPassword;

    @Value("${admin.otp}")
    private String aOtp;

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final GlobalDateUtil globalDateUtil;
    private final DateTimeUtil dateTimeUtil;
    private final EvidenceRepository evidenceRepository;
    private final AdminInitializationHelper adminInitializationHelper;

    @Autowired
    public AdminSeeder(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            GlobalDateUtil globalDateUtil,
            DateTimeUtil dateTimeUtil,
            EvidenceRepository evidenceRepository,
            AdminInitializationHelper adminInitializationHelper
    ) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.globalDateUtil = globalDateUtil;
        this.dateTimeUtil = dateTimeUtil;
        this.evidenceRepository = evidenceRepository;
        this.adminInitializationHelper = adminInitializationHelper;
    }

    @Override
    public void run(ApplicationArguments args) throws Exception {
        Optional<User> optUser = adminInitializationHelper.findUser(aEmail);
        if(optUser.isEmpty()){
            User admin = new User();
            admin.setName(aName);
            admin.setContactNumber(aContactNumber);
            admin.setEmail(aEmail);
            admin.setAddress("Pokhara, Nepal");
            admin.setPassword(passwordEncoder.encode(aPassword));
            admin.setRoles(RolesEnum.ROLE_ADMIN.toString());
            admin.setAppliedDate(globalDateUtil.getCurrentDate());
            admin.setVerifiedDate(globalDateUtil.getCurrentDate());
            admin.setVerified(true);
            admin.setPresent(true);
            admin.setOtp(passwordEncoder.encode(aOtp));
            admin.setOtpGeneratedTime(dateTimeUtil.getLocalDateTime());
            admin.setActive(true);
            admin.setProfileUpdated(true);
            admin = userRepository.save(admin);
            userRepository.flush();

            Evidence evidence = new Evidence();
            evidence.setUserImage("uploads/ankitgurung.jpeg");
            evidence.setEvidenceOne("uploads/citizenship-front.jpg");
            evidence.setEvidenceTwo("uploads/citizenship-back.jpg");
            evidence.setDocumentType("citizenship");
            evidence.setUser(admin);
            evidenceRepository.save(evidence);
            evidenceRepository.flush();
        }
    }

}
