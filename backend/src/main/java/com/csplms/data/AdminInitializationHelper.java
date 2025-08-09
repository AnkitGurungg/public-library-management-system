package com.csplms.data;

import com.csplms.entity.User;
import com.csplms.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class AdminInitializationHelper {

    private final UserRepository userRepository;

    @Autowired
    public AdminInitializationHelper(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public Optional<User> findUser(String email) {
        return userRepository.findUserByEmail(email);
    }

}
