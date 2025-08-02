package com.csplms.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.web.client.RestClient;

@Configuration
public class RestAPIConfig {

    private final KhaltiAPIProperties khaltiProperties;

    @Autowired
    public RestAPIConfig(KhaltiAPIProperties khaltiProperties) {
        this.khaltiProperties = khaltiProperties;
    }

    @Bean
    public RestClient khaltiRestClient() {
        return RestClient.builder()
                .baseUrl(khaltiProperties.getBaseUrl())
                .defaultHeader(khaltiProperties.getAuthHeaderName(), khaltiProperties.getAuthHeaderValue())
                .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .build();
    }

}
