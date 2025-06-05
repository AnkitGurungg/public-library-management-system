package com.csplms.exception;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ResourceEntityNotFoundException extends RuntimeException {
    final String resourceName;
    final String fieldName;
    final long fieldValue;

    public ResourceEntityNotFoundException(String resourceName, String fieldName, long fieldValue) {
        super(String.format("%s does not exist in %s : %s!", resourceName, fieldName, fieldValue));
        this.resourceName = resourceName;
        this.fieldName = fieldName;
        this.fieldValue = fieldValue;
    }

}
