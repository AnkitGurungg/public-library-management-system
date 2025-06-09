package com.csplms.controller.LibrarianAdmin;

import com.csplms.dto.responseDto.AdminUserDto;
import com.csplms.dto.responseDto.UserDto;
import com.csplms.dto.responseDto.UsersForBorrowResponseDto;
import com.csplms.entity.User;
import org.springframework.http.HttpStatus;
import com.csplms.dto.requestDto.RejectKYCDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.csplms.service.LibrarianAdmin.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/la/users")
@EnableMethodSecurity(prePostEnabled = true)
@PreAuthorize("hasAnyAuthority('ROLE_LIBRARIAN', 'ROLE_ADMIN')")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<List<UsersForBorrowResponseDto>> getAllUsers() {
        return new ResponseEntity<>(this.userService.getAllUsers(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserDto> getUser(@PathVariable("id") int userId) {
        return new ResponseEntity<>(this.userService.getUser(userId), HttpStatus.OK);
    }

    @GetMapping("/non-vm")
    public ResponseEntity<List<AdminUserDto>> getNonVerifiedMembers() {
        return new ResponseEntity<>(this.userService.getNonVerifiedMembers(), HttpStatus.OK);
    }

    @GetMapping("/vm")
    public ResponseEntity<List<AdminUserDto>> getVerifiedMembers() {
        return new ResponseEntity<>(this.userService.getVerifiedMembers(), HttpStatus.OK);
    }

    @PutMapping("/verify/{id}")
    public ResponseEntity<User> verifyUser(@PathVariable("id") Integer userId) {
        return new ResponseEntity<>(this.userService.verifyMember(userId), HttpStatus.OK);
    }

    @PutMapping("/reject/{id}")
    public ResponseEntity<User> rejectUser(@PathVariable("id") Integer userId, @RequestBody RejectKYCDto rejectKYCDto) {
        return new ResponseEntity<>(this.userService.rejectMember(userId, rejectKYCDto), HttpStatus.OK);
    }

    @PutMapping("/restore/{id}")
    public ResponseEntity<Integer> restoreUser(@PathVariable("id") Integer userId) {
        return new ResponseEntity<>(this.userService.restoreMember(userId), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Integer> deleteUser(@PathVariable("id") Integer userId) {
        return new ResponseEntity<>(this.userService.deleteUser(userId), HttpStatus.OK);
    }

}
