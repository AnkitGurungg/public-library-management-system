package com.csplms.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.io.File;
import java.nio.file.Path;

@Component
public class DirectoryConfig {
    private static final Logger logger = LoggerFactory.getLogger(DirectoryConfig.class);
    private final String ROOT_DIR_STRING = System.getProperty("user.dir");
    private final Path UPLOADS_ROOT_DIR_STRING = Path.of(ROOT_DIR_STRING, "uploads");

    public DirectoryConfig() {
        File uploadDir = new File(UPLOADS_ROOT_DIR_STRING.toString());
        logger.warn("uploadDir: {}", uploadDir);

        if (!uploadDir.exists()) {
            boolean created = uploadDir.mkdirs();
            if (created) {
                logger.error("Uploads directory created at: {}", UPLOADS_ROOT_DIR_STRING);
            } else {
                logger.error("Failed to create uploads directory.");
            }
        } else {
            logger.warn("Uploads directory already exists at: {}", UPLOADS_ROOT_DIR_STRING);
        }
    }

}
