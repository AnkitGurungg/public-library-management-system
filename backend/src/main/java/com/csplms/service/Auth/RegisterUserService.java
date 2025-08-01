package com.csplms.service.Auth;

import com.csplms.dto.requestDto.KYCFillUpDto;
import com.csplms.dto.responseDto.UserResponseDto;
import jakarta.transaction.Transactional;
import org.springframework.web.multipart.MultipartFile;

public interface RegisterUserService {
    @Transactional
    UserResponseDto registerMemberUser(KYCFillUpDto kycFillUpDto, MultipartFile memberUserImage, MultipartFile[] memberUserEvidences);
}
