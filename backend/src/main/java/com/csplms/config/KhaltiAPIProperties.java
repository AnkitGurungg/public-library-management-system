package com.csplms.config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "khalti.api")
@Getter
@Setter
public class KhaltiAPIProperties {

    private String authHeaderName;
    private String authHeaderValue;

    private String baseUrl;
    private String initiateUrl;
    private String lookupUrl;

}
