package com.csplms.listener;

import com.csplms.event.BookCreatedEvent;
import com.csplms.event.NotificationEvent;
import com.csplms.event.OtpGeneratedEvent;
import com.csplms.exception.MailFailedException;
import com.csplms.service.Member.EmailService;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
@RequiredArgsConstructor
@Slf4j
public class NotificationEventListener {

    private final EmailService emailService;

    @RabbitListener(queues = "${app.rabbitmq.notification.email.queue}")
    public void handle(NotificationEvent event) throws MessagingException, MailFailedException, IOException {

        log.info("Received event type: {}", event.getEventType());

        if (event instanceof OtpGeneratedEvent otp) {
            System.err.println("OtpGeneratedEvent received: " + otp);
            emailService.sendOtpEmail(
                    otp.getEmail(),
                    otp.getOtp()
            );
        }

        else if (event instanceof BookCreatedEvent book) {
            System.err.println("BookCreatedEvent received: " + event);
            emailService.newBookMail(
                    book.getBookDto(),
                    book.getEmails()
            );
        }
    }
}
