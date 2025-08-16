package com.csplms.enums;

public enum NotificationEventType {

    OTP_GENERATED("email.otp.generated"),
    BOOK_BORROWED("email.book.borrowed");

    private final String routingKey;

    NotificationEventType(String routingKey) {
        this.routingKey = routingKey;
    }

    public String getRoutingKey() {
        return routingKey;
    }
}
