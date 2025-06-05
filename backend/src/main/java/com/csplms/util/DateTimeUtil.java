package com.csplms.util;

import lombok.Data;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Data
@Component
public class DateTimeUtil {

    private LocalDateTime localDateTime;

    public DateTimeUtil() {
        this.localDateTime = LocalDateTime.now();
    }

}
