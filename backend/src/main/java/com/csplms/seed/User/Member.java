package com.csplms.seed.User;

import com.csplms.entity.User;
import com.csplms.enums.RolesEnum;
import com.csplms.util.DateTimeUtil;
import com.csplms.util.GlobalDateUtil;
import com.csplms.repository.UserRepository;
import org.springframework.stereotype.Component;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.ApplicationArguments;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.*;

@Component
public class Member implements ApplicationRunner {

//    Member
    @Value("${member.name}")
    private String mName;

    @Value("${member.contact}")
    private String mContactNumber;

    @Value("${member.email}")
    private String mEmail;

    @Value("${member.password}")
    private String mPassword;

    @Value("${member.otp}")
    private String mOtp;

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final GlobalDateUtil globalDateUtil;
    private final SeedHelper seedHelper;
    private final DateTimeUtil dateTimeUtil;

    @Autowired
    public Member(UserRepository userRepository, PasswordEncoder passwordEncoder, GlobalDateUtil globalDateUtil, SeedHelper seedHelper, DateTimeUtil dateTimeUtil) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.globalDateUtil = globalDateUtil;
        this.seedHelper = seedHelper;
        this.dateTimeUtil = dateTimeUtil;
    }

    private final Set<String> existingEmails = new HashSet<>();
    private final List<String> nepaliNames = Arrays.asList(
            "Ravi Sharma", "Sita Thapa", "Gita Rai", "Babu Joshi", "Maya Pradhan", "Kiran Gurung",
            "Hari KC", "Suman Shrestha", "Puja Ghimire", "Asha Adhikari", "Rina Baral", "Shyam Khadka",
            "Anil Poudel", "Nirmal Lama", "Deepa Acharya", "Sunita Bista", "Bikash Subedi", "Nirakar Koirala",
            "Tara Maharjan", "Gopal Bhattarai", "Sanjay Nepal", "Rajesh Kunwar", "Madhav Dhakal", "Bishal Rathi",
            "Ramesh Tamang", "Krishna Bastola", "Prem Shrestha", "Sanjiv Poudel", "Monika Pandit", "Sushma Kandel",
            "Amit Rijal", "Shiva Poudel", "Kamal Thapa", "Sagar Basnet", "Deepak Rathi", "Sanjay Subedi",
            "Sarita Gautam", "Gyan Bhattarai", "Narayan Bhujel", "Pushpa Aryal", "Rohit Nepali"
    );

    @Override
    public void run(ApplicationArguments args) throws Exception {
        if (false) {
            Optional<User> optUser = seedHelper.findUser(mEmail);

            if (optUser.isEmpty()) {
                User member = new User();
                member.setName(mName);
                member.setContactNumber(mContactNumber);
                member.setEmail(mEmail);
                member.setAddress("Pokhara-29");
                member.setPassword(passwordEncoder.encode(mPassword));
                member.setRoles(RolesEnum.ROLE_MEMBER.toString());
                member.setAppliedDate(globalDateUtil.getCurrentDate());
                member.setVerifiedDate(globalDateUtil.getCurrentDate());
                member.setVerified(true);
                member.setPresent(true);
                member.setOtp(mOtp);
                member.setOtpGeneratedTime(dateTimeUtil.getLocalDateTime());
                member.setActive(true);
                userRepository.save(member);
            }

            for (int i = 0; i < 40; i++) {
                String fullName = nepaliNames.get(i % nepaliNames.size());
                String firstName = fullName.split(" ")[0];  // Extract the first name
                String email = generateUniqueEmail(firstName);

                // Check if the email is already taken, if so, regenerate
                while (existingEmails.contains(email)) {
                    email = generateUniqueEmail(firstName);
                }

                existingEmails.add(email);

                // Use the new variable name `existingUserOpt`
                Optional<User> existingUserOpt = seedHelper.findUser(email);

                if (existingUserOpt.isEmpty()) {
                    User member = new User();
                    member.setName(fullName);
                    member.setContactNumber("980000000" + (i + 1));  // Just for unique contact number
                    member.setEmail(email);
                    member.setAddress("Pokhara-29");
                    member.setPassword(passwordEncoder.encode("defaultPassword123"));
                    member.setRoles(RolesEnum.ROLE_MEMBER.toString());
                    member.setAppliedDate(globalDateUtil.getCurrentDate());
                    member.setVerifiedDate(globalDateUtil.getCurrentDate());
                    member.setVerified(true);
                    member.setPresent(true);
                    member.setOtp(passwordEncoder.encode("123456"));  // Example OTP
                    member.setOtpGeneratedTime(dateTimeUtil.getLocalDateTime());
                    member.setActive(true);
                    userRepository.save(member);
                }
            }
        }
    }

    private String generateUniqueEmail(String firstName) {
        // Generate email in the format: firstName@m@gmail.com
        return firstName.toLowerCase() + "@gmail.com";
    }

}
