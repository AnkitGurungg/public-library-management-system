package com.csplms.util;

import org.springframework.web.multipart.MultipartFile;

public class FileUtils {
    private FileUtils() {}

    public static String getExtension(MultipartFile file) {
        if (file == null || file.getOriginalFilename() == null) {
            return "";
        }

        String filename = file.getOriginalFilename();
        int lastDot = filename.lastIndexOf('.');

        if (lastDot == -1) {
            return "";
        }

        return filename.substring(lastDot + 1).toLowerCase();
    }
}
