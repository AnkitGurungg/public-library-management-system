package com.csplms.service.Auth;

import com.csplms.entity.RefreshToken;
import com.csplms.entity.User;
import com.csplms.exception.UnauthorizedException;
import com.csplms.exception.UserNotPresentException;
import com.csplms.repository.RefreshTokenRepository;
import com.csplms.repository.UserRepository;
import com.csplms.security.JwtService;
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

    @Override
    public RefreshToken verifyAndGet(String rawToken) {
        User user = userRepository.findUserByEmail(jwtService.extractUsername(rawToken))
                .orElseThrow(() -> new UserNotPresentException("User not found"));

        List<RefreshToken> tokenList = refreshTokenRepository.findAllByUserAndRevokedFalse(user);

        RefreshToken token = null;
        for (RefreshToken item : tokenList){
            if (passwordEncoder.matches(rawToken, item.getToken())) {
                token = item;
            }
        }

        if (token == null) {
            throw new UnauthorizedException("Token does not exist");
        }

        if (token.isRevoked()) {
            throw new UnauthorizedException("Refresh token revoked");
        }

        if (token.getExpiresAt().isBefore(Instant.now())) {
            throw new UnauthorizedException("Refresh token expired");
        }

        return token;
    }

    @Override
    public void revoke(RefreshToken token) {
        token.setRevoked(true);
        refreshTokenRepository.save(token);
    }

    @Override
    public void revokeAll(User user) {
        refreshTokenRepository.findAllByUserAndRevokedFalse(user)
                .forEach(item -> item.setRevoked(true));
    }
}
