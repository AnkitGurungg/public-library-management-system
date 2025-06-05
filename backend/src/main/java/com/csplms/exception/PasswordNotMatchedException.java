package com.csplms.exception;

public class PasswordNotMatchedException extends RuntimeException {

    final String message;

    public PasswordNotMatchedException(String message) {
        super(String.format("%s", message));
        this.message = message;
    }

}
