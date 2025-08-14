package com.csplms.repository;

import com.csplms.entity.RefreshToken;
import com.csplms.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.Instant;
import java.util.List;

@Repository
public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {
    List<RefreshToken> findAllByUserAndRevokedFalse(User user);

    void deleteByUser(User user);

    void deleteByExpiresAtBefore(Instant time);

    void deleteByRevokedTrueAndExpiresAtBefore(Instant time);

    @Modifying
    @Query(value = "ALTER TABLE refresh_tokens AUTO_INCREMENT = 1", nativeQuery = true)
    void resetAutoIncrement();
}
