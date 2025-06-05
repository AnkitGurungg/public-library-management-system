package com.csplms.mapper;

import com.csplms.entity.User;
import org.springframework.stereotype.Component;
import com.csplms.dto.responseDto.LoginResponseDto;

@Component
public class LoginMapper {

    public LoginResponseDto toLoginResponseDto(User user, String accessToken) {
        return new LoginResponseDto(
                user.getUserId(),
                user.getEmail(),
                user.getRoles(),
                accessToken,
                user.isVerified(),
                user.isPresent(),
                user.isActive()
        );
    }

}
