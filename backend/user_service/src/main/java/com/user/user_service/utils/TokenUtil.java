package com.user.user_service.utils;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

public class TokenUtil {

    private static final Key SECRECT_KEY = Keys.secretKeyFor(SignatureAlgorithm.HS256);
    private static final long TOKEN_EXPIRATION_MS = 3600000; // 1 hour

    public static String generateToken(int userId, String isVerified) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("userId", userId);
        claims.put("isVerified", isVerified);
        return Jwts.builder().setClaims(claims)
                .setExpiration(new Date(System.currentTimeMillis() + TOKEN_EXPIRATION_MS)).signWith(SECRECT_KEY)
                .compact();
    }
}
