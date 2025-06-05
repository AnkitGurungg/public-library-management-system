package com.csplms.exception;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BorrowException extends RuntimeException {

    final String message;
    final String fieldName;
    final long fieldId;

    public BorrowException(String message, String fieldName, Integer userId) {
        super(String.format("%s %s : %s", message, fieldName, (long)userId));
        this.message = message;
        this.fieldName = fieldName;
        this.fieldId = userId;
    }

    @Override
    public String getMessage() {
        return super.getMessage();
    }

}
