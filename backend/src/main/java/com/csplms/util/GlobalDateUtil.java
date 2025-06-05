package com.csplms.util;

import lombok.Data;
import org.springframework.stereotype.Component;

import java.sql.Date;
import java.time.LocalDate;

@Component
@Data
public class GlobalDateUtil {

    private Date currentDate;

    public GlobalDateUtil() {
        this.currentDate = Date.valueOf(LocalDate.now());
    }

}
