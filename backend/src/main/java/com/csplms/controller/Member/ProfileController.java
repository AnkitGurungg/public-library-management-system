package com.csplms.controller.Member;

import com.csplms.entity.User;
import com.csplms.service.LibrarianAdmin.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/mla/user/profile")
@EnableMethodSecurity(prePostEnabled = true)
@PreAuthorize("hasAnyAuthority('ROLE_MEMBER', 'ROLE_LIBRARIAN', 'ROLE_ADMIN')")
public class ProfileController {

    private final UserService userService;

    @Autowired
    public ProfileController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/get")
    public ResponseEntity<User> getUser() {
        String email =(String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return new ResponseEntity<>(this.userService.getUser(email), HttpStatus.OK);
    }

}
