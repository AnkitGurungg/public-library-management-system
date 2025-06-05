package com.csplms.exception;

public class UpdateBookException extends RuntimeException {

    final String message;

    public UpdateBookException(String message) {
        super(String.format("%s", message));
        this.message = message;
    }

}
