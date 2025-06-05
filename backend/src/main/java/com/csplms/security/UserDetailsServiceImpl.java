package com.csplms.security;

import com.csplms.entity.User;
import com.csplms.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.Optional;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    private final UserRepository userRepository;

    @Autowired
    public UserDetailsServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String email){
        Optional<User> user = userRepository.findUserByEmail(email);
        return user
                .map(UserDetailsImpl::new)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));
    }

    public User loadUserByUsernameForToken(String email){
        Optional<User> user = userRepository.findUserByEmail(email);
        if (user.isEmpty()) {
            throw new UsernameNotFoundException("User not found with email: " + email);
        }
        return user.get();
    }

}
