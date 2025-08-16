package com.csplms.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;
import org.springframework.beans.factory.annotation.Autowired;

@Component
public class StartupHealthLogger implements ApplicationRunner {

    private final AwsProperties awsProperties;

    private static final Logger logger = LoggerFactory.getLogger(StartupHealthLogger.class);

    @Autowired
    public StartupHealthLogger(AwsProperties awsProperties) {
        this.awsProperties = awsProperties;
    }

    @Override
    public void run(ApplicationArguments args) {
        logger.info("===== APPLICATION STARTUP INFO =====");
        logEnvironmentDetails();
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
}
