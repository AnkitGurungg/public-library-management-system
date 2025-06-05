package com.csplms.exception;

public class ForeignKeyViolationException extends RuntimeException {
    final String message;
    final String fieldName;
    final Integer fieldValue;

    public ForeignKeyViolationException(String message, String fieldName, Integer fieldValue) {
        super(String.format("%s %s : %d ", message, fieldName, fieldValue));
        this.message = message;
        this.fieldName = fieldName;
        this.fieldValue = fieldValue;
    }
}
