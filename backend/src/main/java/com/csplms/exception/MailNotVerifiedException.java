package com.csplms.exception;

public class MailNotVerifiedException extends RuntimeException {

    final String message;

    public MailNotVerifiedException(String message) {
        super(String.format("%s", message));
        this.message = message;
    }

}
