package com.csplms.service.Admin;

import com.csplms.dto.requestDto.KYCFillUpDto;
import com.csplms.dto.responseDto.AdminUserDto;
import com.csplms.dto.responseDto.UserDto;
import com.csplms.entity.User;
import com.csplms.exception.MailFailedException;
import jakarta.mail.MessagingException;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface LibrarianService {
    @Transactional(rollbackFor = {MessagingException.class, MailFailedException.class, Exception.class})
    User addLibrarianUser(
            KYCFillUpDto kycFillUpDto,
            MultipartFile librarianUserImage,
            MultipartFile[] evidenceImages
    ) throws MessagingException, MailFailedException;

    List<AdminUserDto> getAllLibrarians();

    UserDto getLibrarian(int librarianId);

    Integer restoreMember(Integer userId);

    Integer deleteLibrarian(Integer userId);
}
