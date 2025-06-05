package com.csplms.exception;

public class MailFailedException extends Exception {
    final String message;

    public MailFailedException(String message) {
        super(String.format("%s", message));
        this.message = message;
    }

}
