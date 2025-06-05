package com.csplms.security;

import com.csplms.entity.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.List;
import java.util.stream.Stream;
import java.util.stream.Collectors;

public class UserDetailsImpl implements UserDetails {

    private final String email;
    private final String password;
    private final List<GrantedAuthority> roles;

    public UserDetailsImpl(User user) {
        this.email = user.getEmail();
        this.password = user.getPassword();
        this.roles = Stream.of(user.getRoles()
                .split(","))
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList());
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public List<GrantedAuthority> getAuthorities() {
        return roles;
    }

}
