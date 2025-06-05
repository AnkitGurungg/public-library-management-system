package com.csplms.mapper;

import com.csplms.dto.requestDto.KYCFillUpDto;
import com.csplms.dto.responseDto.UserResponseDto;
import com.csplms.entity.User;
import com.csplms.enums.RolesEnum;
import com.csplms.util.GlobalDateUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class AddLibrarianMapper {

    private final GlobalDateUtil globalDateUtil;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public AddLibrarianMapper(GlobalDateUtil globalDateUtil, PasswordEncoder passwordEncoder) {
        this.globalDateUtil = globalDateUtil;
        this.passwordEncoder = passwordEncoder;
    }

    public User toLibrarianUser(KYCFillUpDto kycFillUpDto, String librarianPassword) {
        return new User(
                kycFillUpDto.name(),
                kycFillUpDto.contactNumber(),
                kycFillUpDto.email(),
                kycFillUpDto.address(),
                passwordEncoder.encode(librarianPassword),
                RolesEnum.ROLE_LIBRARIAN.toString(),
                globalDateUtil.getCurrentDate(),
                globalDateUtil.getCurrentDate(),
                true,
                true,
                true,
                true
        );
    }

    public UserResponseDto toUserResponseDto(User user) {
        return new UserResponseDto(
                user.getUserId(),
                user.getName(),
                user.getContactNumber(),
                user.getEmail(),
                user.getAddress(),
                user.getPassword(),
                user.getAppliedDate(),
                user.isVerified(),
                user.isPresent()
        );
    }

}
