package com.csplms.service.Auth;

import com.csplms.entity.RefreshToken;
import com.csplms.entity.User;

public interface RefreshTokenService {
    RefreshToken create(String email, String token);

    RefreshToken verifyAndGet(String rawToken);

    void revoke(RefreshToken token);

    void revokeAll(User user);
}
