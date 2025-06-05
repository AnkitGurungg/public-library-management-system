package com.csplms.mapper;

import com.csplms.entity.User;
import com.csplms.enums.RolesEnum;
import com.csplms.util.DateTimeUtil;
import com.csplms.util.GlobalDateUtil;
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
}
