package com.csplms.listener;

import com.csplms.event.OtpGeneratedEvent;
import com.csplms.exception.MailFailedException;
import com.csplms.service.Member.EmailService;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class OtpGeneratedEventListener {

    private final EmailService emailService;

    @RabbitListener(queues = "${app.rabbitmq.notification.email.queue}")
    public void handle(OtpGeneratedEvent event) throws MessagingException, MailFailedException {
        System.err.println("OtpGeneratedEvent received: " + event);

        emailService.sendOtpEmail(
                event.getEmail(),
                event.getOtp()
        );
    }
}
