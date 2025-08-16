package com.csplms.publisher;

import com.csplms.event.NotificationEvent;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Slf4j
@RequiredArgsConstructor
@Service
public class NotificationEventPublisher {

    private final RabbitTemplate rabbitTemplate;

    @Value("${app.rabbitmq.notification.exchange}")
    private String exchange;

    public void publish(String routingKey, NotificationEvent event) {

        System.err.println("Publish routingKey: " + routingKey);
        System.err.println("Publish event: " + event);

        rabbitTemplate.convertAndSend(
                exchange,
                routingKey,
                event
        );
    }
}
