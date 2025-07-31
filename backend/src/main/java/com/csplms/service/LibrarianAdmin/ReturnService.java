package com.csplms.service.LibrarianAdmin;

import com.csplms.entity.Return;
import com.csplms.exception.MailFailedException;
import jakarta.mail.MessagingException;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface ReturnService {
    @Transactional(rollbackFor = {MessagingException.class, MailFailedException.class, Exception.class})
    Return returnBook(int borrowId) throws MessagingException, MailFailedException;

    List<Return> getAllReturns();
}
