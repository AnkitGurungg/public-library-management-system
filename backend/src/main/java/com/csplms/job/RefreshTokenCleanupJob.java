package com.csplms.job;

import com.csplms.repository.RefreshTokenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.time.temporal.ChronoUnit;

@Component
public class RefreshTokenCleanupJob {

    @Value("${jwt.refresh.token.exp.time}")
    private Long revokedTokenRetentionMillis;

    private final RefreshTokenRepository refreshTokenRepository;

    @Autowired
    public RefreshTokenCleanupJob(RefreshTokenRepository refreshTokenRepository) {
        this.refreshTokenRepository = refreshTokenRepository;
    }

    @Scheduled(cron = "${refresh.token.cleanup.cron}")
    @Transactional
    public void cleanup() {
        Instant now = Instant.now();

        // delete expired tokens
        refreshTokenRepository.deleteByExpiresAtBefore(now);

        // delete revoked tokens older than 7 days / (revokedTokenRetentionMillis)
        refreshTokenRepository.deleteByRevokedTrueAndExpiresAtBefore(
                now.minus(
                        revokedTokenRetentionMillis,
                        ChronoUnit.MILLIS
                )
        );

        // reset auto-increment if table is empty
        if (refreshTokenRepository.count() == 0) {
            refreshTokenRepository.resetAutoIncrement();
        }
    }
}
