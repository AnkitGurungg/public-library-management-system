package com.csplms.exception;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UniqueKeyViolationException extends RuntimeException {

    final String message;

    public UniqueKeyViolationException(String message) {
        super(String.format("%s", message));
        this.message = message;
    }

}
