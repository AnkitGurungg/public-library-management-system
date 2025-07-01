package com.csplms.exception;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class KhaltiPaymentInitiateFailedException extends RuntimeException {

    final boolean status;
    final String message;

    public KhaltiPaymentInitiateFailedException(boolean status, String message) {
        super(String.format("%s", message));
        this.status = status;
        this.message = message;
    }
}
