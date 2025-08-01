package com.csplms.mapper;

import com.csplms.entity.User;
import com.csplms.enums.RolesEnum;
import com.csplms.util.DateTimeUtil;
import lombok.NonNull;
import com.csplms.util.GlobalDateUtil;
import com.csplms.dto.requestDto.KYCFillUpDto;
import com.csplms.dto.responseDto.UserResponseDto;
import org.springframework.stereotype.Component;
import com.csplms.dto.requestDto.RegistrationRequestDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;

@Component
public class RegistrationMapper {

    private final GlobalDateUtil globalDateUtil;
    private final DateTimeUtil dateTimeUtil;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public RegistrationMapper(GlobalDateUtil globalDateUtil, final DateTimeUtil dateTimeUtil, final PasswordEncoder passwordEncoder) {
        this.globalDateUtil = globalDateUtil;
        this.dateTimeUtil = dateTimeUtil;
        this.passwordEncoder = passwordEncoder;
    }

//    for email verification
    public User toUser(RegistrationRequestDto registrationRequestDto, String otp) {
        return new User(
                registrationRequestDto.email(),
                passwordEncoder.encode(registrationRequestDto.password()),
                RolesEnum.ROLE_MEMBER.toString(),
                false,
                true,
                passwordEncoder.encode(otp),
                dateTimeUtil.getLocalDateTime(),
                false
        );
    }

//    to submit kyc form
    public User toMemberUser(User user, KYCFillUpDto kycFillUpDto) {
        user.setName(kycFillUpDto.name());
        user.setContactNumber(kycFillUpDto.contactNumber());
        user.setAddress(kycFillUpDto.address());
        user.setAppliedDate(globalDateUtil.getCurrentDate());
        user.setVerifiedDate(globalDateUtil.getCurrentDate());
        user.setProfileUpdated(true);
        return user;
    }

//    for response
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
