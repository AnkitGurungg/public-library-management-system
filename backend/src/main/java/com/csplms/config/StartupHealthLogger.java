package com.csplms.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.HeadBucketRequest;
import software.amazon.awssdk.services.s3.model.S3Exception;

@Component
public class StartupHealthLogger implements ApplicationRunner {

    private final AwsProperties awsProperties;
    private final JdbcTemplate jdbcTemplate;
    private final S3Client s3Client;

    private static final Logger logger = LoggerFactory.getLogger(StartupHealthLogger.class);

    @Autowired
    public StartupHealthLogger(
            AwsProperties awsProperties,
            JdbcTemplate jdbcTemplate,
            S3Client s3Client
    ) {
        this.awsProperties = awsProperties;
        this.jdbcTemplate = jdbcTemplate;
        this.s3Client = s3Client;
    }

    @Override
    public void run(ApplicationArguments args) throws Exception {
        logger.info("===== APPLICATION STARTUP INFO =====");
        logEnvironmentDetails();
        checkDatabaseConnection();
        checkS3Connection();
        logger.info("===== APPLICATION STARTED SUCCESSFULLY =====");
    }

    public void logEnvironmentDetails() {
        // OS & Java info
        logger.info("===== Environment Details =====");
        logger.info("OS Name: {}", System.getProperty("os.name"));
        logger.info("OS Arch: {}", System.getProperty("os.arch"));
        logger.info("OS Version: {}", System.getProperty("os.version"));
        logger.info("Java Version: {}", System.getProperty("java.version"));
        logger.info("Java Vendor: {}", System.getProperty("java.vendor"));

        // S3 info
        logger.info("Java Vendor: {}", awsProperties.getS3Region());
        logger.info("Java Vendor: {}", awsProperties.getS3BucketName());

        // Active working dir
        logger.info("User Dir: {}", System.getProperty("user.dir"));
    }

    private void checkDatabaseConnection() {
        int retries = 3;
        logger.info("===== Checking Database Connection =====");
        while (retries > 0) {
            try {
                jdbcTemplate.queryForObject("SELECT 1", Integer.class);
                logger.info("Database connection: OK ");
                return;
            } catch (Exception e) {
                logger.warn("Database connection failed. Retries left: {}. Exception: {}", retries, e.getMessage());
                sleep(3000);
            }
            retries--;
        }
        logger.error("Database connection FAILED, after retries");
        throw new IllegalStateException("Cannot connect to database");
    }

    private void checkS3Connection() {
        int retries = 3;
        logger.info("===== Checking S3 Connection =====");
        while (retries > 0) {
            try {
                HeadBucketRequest request = HeadBucketRequest.builder()
                        .bucket(awsProperties.getS3BucketName())
                        .build();
                s3Client.headBucket(request);
                logger.info("S3 bucket access: OK");
                return;
            } catch (S3Exception e) {
                logger.warn("S3 connection failed. Retries left: {}. Exception: {}", retries, e.getMessage());
                sleep(3000);
            }
            retries--;
        }
        logger.error("S3 bucket access FAILED, after retries");
        throw new IllegalStateException("Cannot access S3 bucket");
    }

    private void sleep(long millis) {
        try {
            Thread.sleep(millis);
        } catch (InterruptedException ignored) {

        }
    }
}
