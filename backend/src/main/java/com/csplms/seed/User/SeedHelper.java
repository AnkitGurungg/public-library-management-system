package com.csplms.seed.User;

import com.csplms.entity.User;
import com.csplms.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class SeedHelper {
    private final UserRepository userRepository;

    @Autowired
    public SeedHelper(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public Optional<User> findUser(String email) {
        return userRepository.findUserByEmail(email);
    }

}
