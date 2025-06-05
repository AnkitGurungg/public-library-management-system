package com.csplms.util;

import com.csplms.entity.User;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Component
public class GetAuthUserUtil {

    public String getAuthUser() {
        return (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }

    public User getAuthUserDetails() {
        return (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }

}
