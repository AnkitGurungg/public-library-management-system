package com.csplms.mapper;

import com.csplms.dto.requestDto.KYCFillUpDto;
import com.csplms.dto.responseDto.UserResponseDto;
import com.csplms.entity.User;
import com.csplms.enums.RolesEnum;
import com.csplms.util.GlobalDateUtil;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class RegisterUserMapper {

    private final GlobalDateUtil globalDateUtil;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public RegisterUserMapper(GlobalDateUtil globalDateUtil, PasswordEncoder passwordEncoder) {
        this.globalDateUtil = globalDateUtil;
        this.passwordEncoder = passwordEncoder;
    }

    public User toMemberUser(User user, KYCFillUpDto kycFillUpDto) {
        user.setName(kycFillUpDto.name());
        user.setContactNumber(kycFillUpDto.contactNumber());
        user.setAddress(kycFillUpDto.address());
        user.setAppliedDate(globalDateUtil.getCurrentDate());
        user.setVerifiedDate(globalDateUtil.getCurrentDate());
        user.setProfileUpdated(true);
        return user;
    }

    public UserResponseDto toUserResponseDto(@NonNull User user) {
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
