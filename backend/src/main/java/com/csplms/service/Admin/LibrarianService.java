package com.csplms.service.Admin;

import com.csplms.entity.User;
import com.csplms.exception.ResourceEntityNotFoundException;
import com.csplms.exception.ResourceListNotFoundException;
import com.csplms.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LibrarianService {

    private final UserRepository userRepository;

    @Autowired
    public LibrarianService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> getAllLibrarians() {
        List<User> librarians = userRepository.getAllLibrarians();
        if (librarians.isEmpty()){
            throw new ResourceListNotFoundException("Librarians");
        }
        return librarians;
    }

    public Integer restoreMember(Integer userId) {
        User user = this.userRepository.findById(userId).orElseThrow(() -> new ResourceEntityNotFoundException("User", "Id", userId));
        if (user.isPresent()){
            throw new ResourceEntityNotFoundException("User", "Id", userId);
        }

        user.setActive(true);
        user.setVerified(true);
        user.setPresent(true);
        userRepository.save(user);
        userRepository.flush();

        return 1;
    }

}
