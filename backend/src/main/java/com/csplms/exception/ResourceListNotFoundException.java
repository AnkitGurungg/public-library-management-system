package com.csplms.exception;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ResourceListNotFoundException extends RuntimeException {

    final String resourceName;

    public ResourceListNotFoundException(String resourceName) {
        super(String.format("%s are currently unavailable!", resourceName));
        this.resourceName = resourceName;
    }

}
