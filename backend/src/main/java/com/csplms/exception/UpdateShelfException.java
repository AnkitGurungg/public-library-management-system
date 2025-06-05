package com.csplms.exception;

public class UpdateShelfException extends RuntimeException {

    final String message;

    public UpdateShelfException(String message) {
        super(String.format("%s", message));
        this.message = message;
    }

}
