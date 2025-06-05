package com.csplms.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestClient;

@Configuration
public class RestAPIConfig {

    @Bean
    public RestClient restTemplate() {
        return RestClient.builder()
                .baseUrl("http://localhost:8080")
                .defaultHeader("Content-Type", "application/json")
                .build();
    }

}
