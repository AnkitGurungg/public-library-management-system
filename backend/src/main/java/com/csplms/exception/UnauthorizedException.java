package com.csplms.exception;

public class UnauthorizedException extends RuntimeException {

    final String message;

    public UnauthorizedException(String message) {
        super(String.format("%s", message));
        this.message = message;
    }

}
