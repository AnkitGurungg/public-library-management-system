package com.csplms.job;

import com.csplms.repository.RefreshTokenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.time.temporal.ChronoUnit;

@Component
@EnableScheduling
public class RefreshTokenCleanupJob {



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

        // delete revoked tokens older than 7 days
        refreshTokenRepository.deleteByRevokedTrueAndExpiresAtBefore(
                now.minus(
                        7,
                        ChronoUnit.DAYS
                )
        );
    }
}

