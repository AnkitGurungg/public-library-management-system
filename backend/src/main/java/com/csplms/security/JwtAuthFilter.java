package com.csplms.security;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Component;
import com.csplms.exception.UnauthorizedException;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.servlet.HandlerExceptionResolver;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import java.io.IOException;

@Component
public class JwtAuthFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final UserDetailsServiceImpl userDetailsServiceImpl;
    private final HandlerExceptionResolver handlerExceptionResolver;
    private static final Logger logger = LoggerFactory.getLogger(JwtAuthFilter.class);

    @Autowired
    public JwtAuthFilter(JwtService jwtService, UserDetailsServiceImpl userDetailsServiceImpl, HandlerExceptionResolver handlerExceptionResolver) {
        this.jwtService = jwtService;
        this.userDetailsServiceImpl = userDetailsServiceImpl;
        this.handlerExceptionResolver = handlerExceptionResolver;
    }

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {
        final String authHeader = request.getHeader("Authorization");

        logger.warn("JwtAuthFilter authHeader: {}",authHeader);

        if(authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        logger.warn("JwtAuthFilter between: {}",authHeader);

        try {
            logger.warn("Try catch: {}",authHeader);
            String jwtToken = authHeader.substring(7);
            String email = jwtService.extractUsername(jwtToken);

            String tokenType = jwtService.extractClaim(jwtToken, claims ->
                    claims.get("tokenType", String.class));
            if ("REFRESH".equals(tokenType)) {
                throw new UnauthorizedException("Invalid token type");
            }

            if (email !=null && SecurityContextHolder.getContext().getAuthentication() == null ) {
                UserDetails userDetails = userDetailsServiceImpl.loadUserByUsername(email);

                if(Boolean.TRUE.equals(jwtService.validateToken(jwtToken, userDetails))){
                    UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                            userDetails.getUsername(),
                            null,
                            userDetails.getAuthorities()
                    );
                    authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(authToken);
                }
            }
            filterChain.doFilter(request, response);
        } catch (Exception exception){
            handlerExceptionResolver.resolveException(request, response, null, exception);
        }
    }

}
