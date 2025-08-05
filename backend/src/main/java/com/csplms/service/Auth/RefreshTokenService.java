package com.csplms.service.Auth;

import com.csplms.entity.RefreshToken;
import com.csplms.entity.User;

public interface RefreshTokenService {
    RefreshToken create(String email, String token);

    RefreshToken verifyRefreshToken(String token, String email);

    void revokeRefreshToken(String token);

    void revokeAllUserTokens(User user);
}
