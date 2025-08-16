package com.csplms.service.Member;

import com.csplms.entity.*;
import com.csplms.exception.MailFailedException;
import jakarta.mail.MessagingException;
import org.springframework.core.io.InputStreamSource;
import org.springframework.mail.MailException;

import java.io.IOException;

public interface EmailService {
    // Retrieve image from s3 as an InputStreamSource
    InputStreamSource getImageAsInputStream(String objectKey) throws MailFailedException;

    void newBookMail(Book book, String[] mails) throws MailException, MessagingException, MailFailedException, IOException;

    void sendOtpEmail(String userEmail, String otp) throws MailException, MessagingException, MailFailedException;

    void bookBorrowedMailToMember(User user, Book book, Borrow borrow) throws MailException, MailFailedException, MessagingException;

    void bookEarlyReturnedMailToMember(User user, Book book, Return returns) throws MailException, MailFailedException, MessagingException;

    void bookLateReturnedMailToMember(User user, Book book, Return returns, Fine fine) throws MailException, MailFailedException, MessagingException;

    void dueDateExtendedMailToMember(User user, Book book, Borrow borrow) throws MailException, MailFailedException, MessagingException;

    void borrowDeletedMailToMember(User user, Book book, Borrow borrow) throws MailException, MailFailedException, MessagingException;

    void finePaidMail(User user, Book book, Borrow borrow, Return bookReturn, Payment payment) throws MailException, MessagingException, MailFailedException;

    void librarianAddedMailToLibrarian(User librarianUser, Evidence evidence, String librarianPassword) throws MailException, MessagingException, MailFailedException;

    void librarianAddedMailToAdmin(User librarianUser, Evidence evidence) throws MailException, MessagingException, MailFailedException;
}
