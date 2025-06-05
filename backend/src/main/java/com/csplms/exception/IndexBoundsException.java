package com.csplms.exception;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class IndexBoundsException extends RuntimeException {

    final String fieldName;
    final int fieldLength;

    public IndexBoundsException(String fieldName, int fieldLength) {
        super(String.format("The %s file has more than 2: %d", fieldName, fieldLength));
        this.fieldName = fieldName;
        this.fieldLength = fieldLength;
    }

}
