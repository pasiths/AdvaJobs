package com.user.user_service.utils;

import io.github.cdimascio.dotenv.Dotenv;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;
import org.springframework.stereotype.Component;

import java.security.Key;

@Component
public class JwtUtil {
    private static final Dotenv dotenv = Dotenv.load();
    private static final String SECRET_KEY = dotenv.get("SECRET_KEY");
    private static final Key SECRECT_KEY = Keys.hmacShaKeyFor(SECRET_KEY.getBytes());

    // Validate JWT Token
    public boolean validateToken(String token){
        try {
            Jwts.parser().setSigningKey(SECRECT_KEY).parseClaimsJws(token);
            return true;
        }catch (SignatureException | MalformedJwtException | ExpiredJwtException | UnsupportedJwtException | IllegalArgumentException e){
            System.err.println("Invalid JWT Token" + e.getMessage());
            return false;
        }
    }
}
