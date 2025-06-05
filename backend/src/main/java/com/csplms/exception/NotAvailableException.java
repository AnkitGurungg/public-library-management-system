package com.csplms.exception;

public class NotAvailableException extends RuntimeException {
    final String message;
    final String fieldName;
    final int fieldValue;

    public NotAvailableException(String message, String fieldName, int fieldValue) {
        super(String.format("Unavailable: %s %s %d is out of stock.", message, fieldName, fieldValue));
        this.message = message;
        this.fieldName = fieldName;
        this.fieldValue = fieldValue;
    }
}
