package com.csplms.exception;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserNotPresentException extends RuntimeException {

    final String message;

    public UserNotPresentException(String message) {
        super(message);
        this.message = message;
    }

}
