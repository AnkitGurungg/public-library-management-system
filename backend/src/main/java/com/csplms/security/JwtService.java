package com.csplms.security;

import com.csplms.dto.responseDto.GetUserResponseDto;
import com.csplms.entity.Evidence;
import com.csplms.repository.EvidenceRepository;
import io.jsonwebtoken.Jwts;
import com.csplms.entity.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.stereotype.Service;
import com.csplms.dto.requestDto.GetUserRequestDto;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Map;
import java.util.Date;
import java.security.Key;
import java.util.HashMap;
import java.util.function.Function;

@Service
public class JwtService {

    @Value("${spring.jwt.secret}")
    private String jwtSecret;

    @Value("${jwt.access.token.exp.time}")
    private long accessTokenExpTime;

    @Value("${jwt.refresh.token.exp.time}")
    private long refreshTokenExpTime;

    private final UserDetailsServiceImpl userDetailsService;
    private final EvidenceRepository evidenceRepository;

    @Autowired
    public JwtService(UserDetailsServiceImpl userDetailsService, EvidenceRepository evidenceRepository) {
        this.userDetailsService = userDetailsService;
        this.evidenceRepository = evidenceRepository;
    }

    // Generate token with given username/email
    public String generateToken(String userName) {
        Map<String, Object> claims = new HashMap<>();
        return createToken(claims, userName, accessTokenExpTime);
    }

    public String generateRefreshToken(String userName) {
        Map<String, Object> claims = new HashMap<>();
        return createToken(claims, userName, refreshTokenExpTime);
    }

    // Create a JWT token with specified claims and subject (username/email)
    private String createToken(Map<String, Object> claims, String userName, long validity) {
        return Jwts.builder()
                .claims(claims)
                .subject(userName)
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + validity)) // Token valid for 30 minutes or 1 week
                .signWith(getSignKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    // Get the signing key for JWT token
    private Key getSignKey() {
        byte[] keyBytes = Decoders.BASE64.decode(jwtSecret);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    // Extract the username from the token
    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    // Extract the expiration date from the token
    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    // Extract a claim from the token
    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    // Extract all claims from the token
    private Claims extractAllClaims(String token) {
        return Jwts.parser()
                .setSigningKey(getSignKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    // Check if the token is expired
    private Boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    // Validate the token against user details and expiration
    public Boolean validateToken(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }

    // Validate the token against user details and expiration
    public GetUserResponseDto getUser(GetUserRequestDto getUserRequestDto) {
        if (getUserRequestDto.jwtToken() != null){
            final String username = extractUsername(getUserRequestDto.jwtToken().substring(7));
            User user = this.userDetailsService.loadUserByUsernameForToken(username);
            System.out.println("user: " + user.getUserId());

            Evidence evidence = evidenceRepository.findByUserId(user.getUserId());
            System.out.println("evidence: " + evidence);
            return new GetUserResponseDto(
                    user.getUserId(),
                    user.getName(),
                    user.getEmail(),
                    user.getRoles(),
                    evidence,
                    getUserRequestDto.jwtToken(),
                    user.isVerified(),
                    user.isPresent(),
                    user.isActive()
            );
        } else {
            return new GetUserResponseDto(
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    false,
                    false,
                    false
            );
        }
//        if (Boolean.FALSE.equals(isTokenExpired(getUserRequestDto.jwtToken()))) {
//            throw new RuntimeException("JWT token has expired");
//        }
    }

    public String refreshToken(String refreshToken) {
        if (isTokenExpired(refreshToken)) {
            throw new RuntimeException("Refresh token expired");
        }

        final String username = extractUsername(refreshToken);
        if (username == null) {
            throw new RuntimeException("Invalid refresh token");
        }

        // Verify this is a refresh token (optional additional check)
        String tokenType = extractClaim(refreshToken, claims ->
                claims.get("tokenType", String.class));
        if (!"refresh".equals(tokenType)) {
            throw new RuntimeException("Invalid token type");
        }

        // Generate a new access token
        Map<String, Object> claims = new HashMap<>();
        return createToken(claims, username, accessTokenExpTime);
    }

}
