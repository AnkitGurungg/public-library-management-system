package com.csplms.service.LibrarianAdmin;

import com.csplms.dto.requestDto.RejectKYCDto;
import com.csplms.dto.responseDto.AdminUserDto;
import com.csplms.dto.responseDto.UserAccountInfoDto;
import com.csplms.dto.responseDto.UserDto;
import com.csplms.dto.responseDto.UsersForBorrowResponseDto;
import com.csplms.entity.User;

import java.util.List;

public interface UserService {
    UserDto getUser(int userId);

    UserAccountInfoDto getUserAccountInfo(String email);

    List<AdminUserDto> getNonVerifiedMembers();

    List<AdminUserDto> getVerifiedMembers();

    List<UsersForBorrowResponseDto> getAllUsers();

    Integer deleteUser(Integer userId);

    User verifyMember(Integer userId);

    User rejectMember(Integer userId, RejectKYCDto rejectKYCDto);

    Integer restoreMember(Integer userId);
}
