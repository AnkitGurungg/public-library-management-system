package com.csplms.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.attribute.PosixFileAttributeView;
import java.nio.file.attribute.PosixFilePermission;
import java.nio.file.attribute.PosixFilePermissions;
import java.util.Set;

@Component
public class DirectoryConfig {
    public static final String UPLOADS = "uploads";
    private static final Logger logger = LoggerFactory.getLogger(DirectoryConfig.class);
    private final String ROOT_DIR_STRING = System.getProperty("user.dir");
    private final Path UPLOADS_ROOT_DIR_STRING = Path.of(ROOT_DIR_STRING, UPLOADS);

    public DirectoryConfig() {
        try {
            logger.info("OS name: {}", System.getProperty("os.name"));
            logger.info("OS arch: {}", System.getProperty("os.arch"));
            logger.info("OS version: {}", System.getProperty("os.version"));
            logger.info("Java version: {}", System.getProperty("java.version"));
            logger.info("Java vendor: {}", System.getProperty("java.vendor"));

            createAndSetPermissions(Path.of(ROOT_DIR_STRING));
            createAndSetPermissions(UPLOADS_ROOT_DIR_STRING);
        } catch (Exception e) {
            logger.error("Directory initialization failed", e);
        }
    }

    private void createAndSetPermissions(Path dir) throws IOException {
        // Create directory if not exists
        if (Files.notExists(dir)) {
            Files.createDirectories(dir);
            logger.info("Created directory is: {}", dir);
        } else {
            logger.info("Directory already exists: {}", dir);
        }

        logger.info("The dir: {}", dir);
        logger.info("Before permission");
        logger.info("Writable: {}", Files.isWritable(dir));
        logger.info("isReadable: {}", Files.isReadable(dir));
        logger.info("Executable: {}", Files.isExecutable(dir));

        // Set permissions only if POSIX is supported
        if (supportsPosix(dir)) {
            Set<PosixFilePermission> perms = PosixFilePermissions.fromString("rwxr-xr-x");
            Files.setPosixFilePermissions(dir, perms);
            logger.info("Permissions set to {}", perms);
        } else {
            logger.warn("The dir {} filesystem does not support POSIX permissions", dir);
        }

        logger.info("After permission");
        logger.info("Writable: {}", Files.isWritable(dir));
        logger.info("isReadable: {}", Files.isReadable(dir));
        logger.info("Executable: {}", Files.isExecutable(dir));
    }

    private boolean supportsPosix(Path path) throws IOException {
        return Files.getFileStore(path)
                .supportsFileAttributeView(PosixFileAttributeView.class);
    }

}
