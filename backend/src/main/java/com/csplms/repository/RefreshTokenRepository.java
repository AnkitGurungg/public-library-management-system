package com.csplms.repository;

import com.csplms.entity.RefreshToken;
import com.csplms.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {
    List<RefreshToken> findAllByUserAndRevokedFalse(User user);

    void deleteByUser(User user);
}
