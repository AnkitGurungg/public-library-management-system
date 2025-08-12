package com.csplms;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class ChandraSuryaPublicLibraryManagementSystemApplication {

	private static final Logger logger = LoggerFactory.getLogger(ChandraSuryaPublicLibraryManagementSystemApplication.class);

	public static void main(String[] args) {
		SpringApplication.run(ChandraSuryaPublicLibraryManagementSystemApplication.class, args);
        logger.info("Chandra Surya Public Library Management System");
	}

}
