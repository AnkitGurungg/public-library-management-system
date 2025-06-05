package com.csplms.util;

import org.springframework.stereotype.Component;

import java.util.Random;

@Component
public class OtpUtil {

    public String generateOTP() {
        int intValue = new Random().nextInt(999999);
        String finalOutput = String.valueOf(intValue);

        while(finalOutput.length() < 6) {
            finalOutput = "0" + finalOutput;
        }

        return finalOutput;
    }

}
