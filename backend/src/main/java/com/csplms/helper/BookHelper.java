package com.csplms.helper;

import com.csplms.entity.Return;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;

@Component
public class BookHelper {

    private static final Logger logger = LoggerFactory.getLogger(BookHelper.class);
    private final String ROOT_DIR_STRING = System.getProperty("user.dir");

    public String updateBookImage(MultipartFile bookImage) {
        try {
//            Check if file is not empty
            if (bookImage == null || bookImage.isEmpty()) {
                return null;
            }

//            Save image to path
            Path filePath = Path.of(ROOT_DIR_STRING, "uploads", bookImage.getOriginalFilename());
            Files.write(filePath, bookImage.getBytes());

//            Return relative path
            Path path = Path.of("uploads", bookImage.getOriginalFilename());

            logger.info("Updated book Image path is: {}", path);
            return path.toString();

        } catch (Exception ex) {
            logger.error("Error while updating image is: {}", ex.getMessage());
            return null;
        }
    }

}
