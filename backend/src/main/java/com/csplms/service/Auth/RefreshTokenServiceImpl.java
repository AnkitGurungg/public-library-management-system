package com.csplms.service.Auth;

import com.csplms.entity.RefreshToken;
import com.csplms.entity.User;
import com.csplms.exception.UserNotPresentException;
import com.csplms.repository.RefreshTokenRepository;
import com.csplms.repository.UserRepository;
import com.csplms.security.JwtService;
import com.csplms.util.GetAuthUserUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;

@Service
public class RefreshTokenServiceImpl implements RefreshTokenService {

    @Value("${jwt.refresh.token.exp.time}")
    private long refreshTokenDurationMs;

    private final RefreshTokenRepository refreshTokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final JwtService jwtService;

    @Autowired
    public RefreshTokenServiceImpl(
            RefreshTokenRepository refreshTokenRepository,
            PasswordEncoder passwordEncoder,
            UserRepository userRepository,
            JwtService jwtService
    ) {
        this.refreshTokenRepository = refreshTokenRepository;
        this.passwordEncoder = passwordEncoder;
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }

    public RefreshToken create(String email, String token) {
        User user = userRepository.findUserByEmail(email)
                .orElseThrow(() -> new UserNotPresentException("User not found"));

        RefreshToken refreshToken = new RefreshToken();
        refreshToken.setUser(user);
        refreshToken.setToken(passwordEncoder.encode(token));
        refreshToken.setIssuedAt(Instant.now());
        refreshToken.setExpiresAt(Instant.now().plusMillis(refreshTokenDurationMs));
        refreshToken.setRevoked(false);
        return refreshTokenRepository.save(refreshToken);
    }

    public RefreshToken verifyRefreshToken(String token, String email) {
        User user = userRepository.findUserByEmail(email)
                .orElseThrow(() -> new UserNotPresentException("User not found"));

        RefreshToken matchedToken = getActiveRefreshToken(user, token);
        if (matchedToken.isRevoked()) {
            throw new RuntimeException("Refresh token revoked");
        }
        if (matchedToken.getExpiresAt().isBefore(Instant.now())) {
            throw new RuntimeException("Refresh token expired");
        }

        return matchedToken;
    }

    public void revokeRefreshToken(String token) {
        String email = jwtService.extractUsername(token);
        User user = userRepository.findUserByEmail(email)
                .orElseThrow(() -> new UserNotPresentException("User not found"));

        RefreshToken matchedToken = getActiveRefreshToken(user, token);
        matchedToken.setRevoked(true);
        refreshTokenRepository.save(matchedToken);
    }

    public void revokeAllUserTokens(User user) {
        refreshTokenRepository.deleteByUser(user);
    }

    private RefreshToken getActiveRefreshToken(User user, String rawToken) {
        List<RefreshToken> tokenList = refreshTokenRepository.findAllByUserAndRevokedFalse(user);
        return tokenList.stream()
                .filter(item -> passwordEncoder.matches(rawToken, item.getToken()))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Refresh token not found or revoked"));
    }

}
