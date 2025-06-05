package com.csplms.seed.User;

import com.csplms.entity.User;
import com.csplms.enums.RolesEnum;
import com.csplms.repository.UserRepository;
import com.csplms.util.DateTimeUtil;
import com.csplms.util.GlobalDateUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.*;

@Component
public class Librarian implements ApplicationRunner {

//    Librarian
    @Value("${librarian.name}")
    private String lName;

    @Value("${librarian.contact}")
    private String lContactNumber;

    @Value("${librarian.email}")
    private String lEmail;

    @Value("${librarian.password}")
    private String lPassword;

    @Value("${librarian.otp}")
    private String lOtp;

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final GlobalDateUtil globalDateUtil;
    private final SeedHelper seedHelper;
    private final DateTimeUtil dateTimeUtil;

    @Autowired
    public Librarian(UserRepository userRepository, PasswordEncoder passwordEncoder, GlobalDateUtil globalDateUtil, SeedHelper seedHelper, DateTimeUtil dateTimeUtil) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.globalDateUtil = globalDateUtil;
        this.seedHelper = seedHelper;
        this.dateTimeUtil = dateTimeUtil;
    }

//    private final Set<String> existingEmails = new HashSet<>();
//    private final List<String> librarianNames = Arrays.asList(
//            "Rajendra Soni", "Sujan Thapa", "Bhanu Pradhan", "Pawan Gurung", "Anish Rai", "Niraj Ghimire",
//            "Ramesh Bista", "Manoj Kandel", "Pradeep Baral", "Ajay Joshi", "Sanjay Shrestha", "Saroj Khadka",
//            "Dinesh Thapaliya", "Suman Poudel", "Rohit Rathi", "Sangita Bhattarai", "Anjana Baral", "Prabesh KC",
//            "Kanchan Poudel", "Ashok Dhakal", "Nabin Maharjan", "Krishna Baral", "Sudhir Shrestha", "Bikash Adhikari",
//            "Subash Thapa", "Gokul Koirala", "Bikram Bista", "Madhuri Khadka", "Shree Krishna Gurung", "Kiran Poudel",
//            "Amit Subedi", "Tara Adhikari", "Santosh Kandel", "Kiran Bhujel", "Bishnu Rathi", "Rupendra Tamang",
//            "Manoj Ghimire", "Madhusree Shrestha", "Sunil Khadka", "Purna Bista", "Anil Pandit", "Sandeep Maharjan"
//    );

    @Override
    public void run(ApplicationArguments args) throws Exception {


//        int librarianCount = 50;  // Define the number of librarians to seed
//        int index = 0;
//
//        // Loop to seed librarians
//        for (int i = 0; i < librarianCount; i++) {
//            String fullName = librarianNames.get(index % librarianNames.size());
//            String firstName = fullName.split(" ")[0];  // Extract first name from full name
//            String email = generateUniqueEmail(firstName); // Generate unique email based on first name
//
//            // Ensure the email is unique
//            while (existingEmails.contains(email)) {
//                email = generateUniqueEmail(firstName); // Regenerate email if it's already taken
//            }
//
//            existingEmails.add(email); // Add email to the set to track uniqueness
//
//            Optional<User> existingUserOpt = seedHelper.findUser(email);
//
//            // If no existing user with that email, create and save the librarian
//            if (existingUserOpt.isEmpty()) {
//                User librarian = new User();
//                librarian.setName(fullName); // Set full name
//                librarian.setContactNumber("980000000" + (i + 1));  // Unique contact number
//                librarian.setEmail(email);  // Set unique email
//                librarian.setAddress("Pokhara-29");
//                librarian.setPassword(passwordEncoder.encode("defaultPassword123"));
//                librarian.setRoles(RolesEnum.ROLE_LIBRARIAN.toString()); // Assign librarian role
//                librarian.setAppliedDate(globalDateUtil.getCurrentDate());
//                librarian.setVerifiedDate(globalDateUtil.getCurrentDate());
//                librarian.setVerified(true);
//                librarian.setPresent(true);
//                librarian.setOtp(passwordEncoder.encode("123456"));  // Example OTP
//                librarian.setOtpGeneratedTime(dateTimeUtil.getLocalDateTime());
//                librarian.setActive(true);
//                userRepository.save(librarian);  // Save the librarian to the repository
//            }
//
//            // Move to the next name in the list
//            index++;
//        }

        if (false) {

            Optional<User> optUser = seedHelper.findUser(lEmail);
            if (optUser.isEmpty()) {
                User librarian = new User();
                librarian.setName(lName);
                librarian.setContactNumber(lContactNumber);
                librarian.setEmail(lEmail);
                librarian.setAddress("Pokhara-29");
                librarian.setPassword(passwordEncoder.encode(lPassword));
                librarian.setRoles(RolesEnum.ROLE_LIBRARIAN.toString());
                librarian.setAppliedDate(globalDateUtil.getCurrentDate());
                librarian.setVerifiedDate(globalDateUtil.getCurrentDate());
                librarian.setVerified(true);
                librarian.setPresent(true);
                librarian.setOtp(lOtp);
                librarian.setOtpGeneratedTime(dateTimeUtil.getLocalDateTime());
                librarian.setActive(true);
                userRepository.save(librarian);
            }
        }
    }

//        private String generateUniqueEmail(String firstName) {
//            return firstName.toLowerCase() + "@gmail.com";  // Email generation logic based on first name
//        }
}
