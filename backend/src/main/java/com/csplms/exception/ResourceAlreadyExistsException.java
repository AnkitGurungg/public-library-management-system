package com.csplms.exception;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ResourceAlreadyExistsException extends RuntimeException {
    final String message;

    public ResourceAlreadyExistsException(String message) {
        super(String.format("%s", message));
        this.message = message;
    }

}
