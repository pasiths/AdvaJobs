package com.user.user_service.utils;

import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;
import java.util.Random;

@Component
public class OtpUtil {
    private final Map<String, String> otpStorage = new HashMap<>(); // Temporary OTP storage

    public String generateOtp(String email) {
        Random random = new Random();
        String otp = String.format("%06d", random.nextInt(999999));
        otpStorage.put(email, otp);
        return otp;
    }
}
