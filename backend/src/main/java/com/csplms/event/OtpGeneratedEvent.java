package com.csplms.event;

import com.csplms.enums.NotificationEventType;
import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class OtpGeneratedEvent implements NotificationEvent {
    private String email;
    private String otp;

    @Override
    public String getEventType() {
        return NotificationEventType.OTP_GENERATED.getRoutingKey();
    }
}
