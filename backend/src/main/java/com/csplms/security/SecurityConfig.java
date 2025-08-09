package com.csplms.security;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpMethod;
import com.csplms.repository.UserRepository;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.context.annotation.Configuration;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;

import java.util.List;

@Configuration
@EnableMethodSecurity(prePostEnabled = true)
public class SecurityConfig {

    @Value("${frontend.base-url}")
    private String frontendBaseUrl;

    private final JwtAuthFilter jwtAuthFilter;
    private final UserRepository userRepository;

    @Autowired
    public SecurityConfig(JwtAuthFilter jwtAuthFilter, UserRepository userRepository) {
        this.jwtAuthFilter = jwtAuthFilter;
        this.userRepository = userRepository;
    }

    // Beans
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public UserDetailsService userDetailsService() {
        return new UserDetailsServiceImpl(userRepository);
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider daoAuthProvider = new DaoAuthenticationProvider();
        daoAuthProvider.setPasswordEncoder(passwordEncoder());
        daoAuthProvider.setUserDetailsService(userDetailsService());

        return daoAuthProvider;
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of(frontendBaseUrl));
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(List.of("*"));
        configuration.setAllowCredentials(true); // Required for withCredentials: true in Axios
        configuration.setExposedHeaders(List.of("Authorization", "refreshToken", "Cache-Control", "Content-Type", "*"));
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
//                .securityMatcher("/**") // Apply security to all
                .csrf(AbstractHttpConfigurer::disable)
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .authorizeHttpRequests(auth -> auth

                        .requestMatchers("/uploads/**").permitAll()
                        .requestMatchers("/","/images/**", "/static/**", "/*.png", "/*.jpg", "/*.jpeg", "/*.gif", "/*.webp", "/*.svg").permitAll()
                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/v1/p/**").permitAll()
                        .requestMatchers(HttpMethod.POST, "/auth/register","/auth/login", "/auth/refresh-token").permitAll()

//                        Permit all requests
//                        .requestMatchers("/**").permitAll()
//                        .anyRequest().permitAll()

//                        Role-based authorization
                        .requestMatchers("/auth/v1/**").hasAnyAuthority("ROLE_MEMBER", "ROLE_LIBRARIAN", "ROLE_ADMIN")
                        .requestMatchers("/api/v1/l/**").hasAuthority("ROLE_LIBRARIAN")
                        .requestMatchers("/api/v1/a/**").hasAuthority("ROLE_ADMIN")
                        .requestMatchers("/api/v1/la/**").hasAnyAuthority("ROLE_LIBRARIAN", "ROLE_ADMIN")
                        .requestMatchers("/api/v1/m/**").hasAnyAuthority("ROLE_MEMBER", "ROLE_LIBRARIAN", "ROLE_ADMIN")
                        .requestMatchers("/api/v1/mla/**").hasAnyAuthority("ROLE_MEMBER", "ROLE_LIBRARIAN", "ROLE_ADMIN")
                        .anyRequest().authenticated()
                )
                .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )
                .authenticationProvider(authenticationProvider())
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

}
