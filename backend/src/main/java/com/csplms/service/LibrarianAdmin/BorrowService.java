package com.csplms.service.LibrarianAdmin;

import com.csplms.dto.requestDto.BorrowRequestDto;
import com.csplms.dto.requestDto.ExtendDueDateDto;
import com.csplms.dto.responseDto.AdminBorrowDto;
import com.csplms.dto.responseDto.BorrowResponseDto;
import com.csplms.dto.responseDto.reports.OverdueStatsDTO;
import com.csplms.entity.Borrow;
import com.csplms.exception.MailFailedException;
import jakarta.mail.MessagingException;
import org.springframework.data.domain.Page;
import org.springframework.transaction.annotation.Transactional;

public interface BorrowService {
    @Transactional(rollbackFor = {MessagingException.class, MailFailedException.class, Exception.class})
    BorrowResponseDto borrow(BorrowRequestDto borrowRequestDto) throws MessagingException, MailFailedException;

    @Transactional(rollbackFor = {MessagingException.class, MailFailedException.class, Exception.class})
    Borrow extend(Integer borrowId, ExtendDueDateDto extendDueDateDto) throws MessagingException, MailFailedException;

    BorrowResponseDto getBorrowRecord(Integer borrowId);

    Page<AdminBorrowDto> getAllBorrowRecords(int page, int size, String name, Boolean extended, Boolean returnStatus);

    Page<AdminBorrowDto> getAllOverdueBorrowBooks(int page, int size, String name, Boolean extended, Boolean returnStatus);

    @Transactional(rollbackFor = {MessagingException.class, MailFailedException.class, Exception.class})
    Integer deleteBorrow(int borrowId) throws MessagingException, MailFailedException;

    OverdueStatsDTO getOverdueStats();
}
