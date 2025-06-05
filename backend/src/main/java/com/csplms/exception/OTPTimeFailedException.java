package com.csplms.exception;

public class OTPTimeFailedException extends RuntimeException {
    final String message;
    public OTPTimeFailedException(String message) {
        super(String.format("%s", message));
        this.message = message;
    }
}
