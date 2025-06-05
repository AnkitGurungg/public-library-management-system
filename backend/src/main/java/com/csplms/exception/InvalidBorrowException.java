package com.csplms.exception;

public class InvalidBorrowException extends RuntimeException {

    final String message;

    public InvalidBorrowException(String message) {
      super(String.format("%s", message));
      this.message = message;
    }

}
