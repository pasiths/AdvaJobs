package com.user.user_service.controller;

import com.user.user_service.data.User;
import com.user.user_service.dto.LoginRequestDto;
import com.user.user_service.dto.UpdateDto;
import com.user.user_service.dto.UserDto;
import com.user.user_service.service.UserService;

import com.user.user_service.utils.JwtUtil;
import com.user.user_service.utils.TokenUtil;
import jakarta.mail.MessagingException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;

    @GetMapping(path = "/test")
    public String getTest() {
        return userService.apiTest();
    }

    // register user
    @PostMapping(path = "/users")
    public ResponseEntity<User> registerUser(@Valid @ModelAttribute UserDto request, HttpServletResponse response)
            throws MessagingException {
        User user = userService.registerUser(request);

        String token = TokenUtil.generateToken(user.getId(), user.getIsVerified().toString());

        ResponseCookie cookie = ResponseCookie.from("auth_token", token).httpOnly(true).secure(true).path("/")
                .maxAge(3600) // 1 hour
                .build();

        response.setHeader("Set-Cookie", cookie.toString());

        return ResponseEntity.ok(user);
    }

    // login user
    @PostMapping(path = "/users/login")
    public ResponseEntity<User> login(@Valid @RequestBody LoginRequestDto request, HttpServletResponse response)
            throws MessagingException {
        User user = userService.loginUser(request);

        String token = TokenUtil.generateToken(user.getId(), user.getIsVerified().toString());

        ResponseCookie cookie = ResponseCookie.from("auth_token", token).httpOnly(true).secure(true).path("/")
                .maxAge(3600) // 1 hour
                .build();

        response.setHeader("Set-Cookie", cookie.toString());

        return ResponseEntity.ok(user);
    }

    // Otp Resend
    @PostMapping(path = "/users/resend-otp")
    public ResponseEntity<String> resendOtp(HttpServletRequest request) throws MessagingException {
        String token = null;

        // Extract the token from cookies
        if (request.getCookies() != null) {
            for (var cookie : request.getCookies()) {
                if (cookie.getName().equals("auth_token")) {
                    token = cookie.getValue();
                }
            }
        }

        if (token == null) {
            throw new IllegalArgumentException("Token not found");
        }

        if (!jwtUtil.validateToken(token)) {
            throw new IllegalArgumentException("Invalid or expired token");
        }
        String req = request.getParameter("email");
        userService.resendOtp(req);
        return ResponseEntity.ok("OTP sent successfully");
    }

    // get all users
    @GetMapping(path = "/users")
    public List<User> getUsers(HttpServletRequest request) {
        String token = null;

        // Extract the token from cookies
        if (request.getCookies() != null) {
            for (var cookie : request.getCookies()) {
                if (cookie.getName().equals("auth_token")) {
                    token = cookie.getValue();
                }
            }
        }

        if (token == null) {
            throw new IllegalArgumentException("Token not found");
        }

        return userService.getUsers();
    }

    // get user by id
    @GetMapping(path = "/users/{id}")
    public User getUser(HttpServletRequest request, @PathVariable int id) {
        String token = null;

        // Extract the token from cookies
        if (request.getCookies() != null) {
            for (var cookie : request.getCookies()) {
                if (cookie.getName().equals("auth_token")) {
                    token = cookie.getValue();
                }
            }
        }

        if (token == null) {
            throw new IllegalArgumentException("Token not found");
        }
        return userService.getUser(id);
    }

    // update user
    @PutMapping(path = "/users/{id}")
    public User updateUser(HttpServletRequest request, @PathVariable int id, @Valid @ModelAttribute UpdateDto us) {
        String token = null;

        // Extract the token from cookies
        if (request.getCookies() != null) {
            for (var cookie : request.getCookies()) {
                if (cookie.getName().equals("auth_token")) {
                    token = cookie.getValue();
                }
            }
        }

        if (token == null) {
            throw new IllegalArgumentException("Token not found");
        }
        return userService.updateUser(id, us);
    }

    // delete user
    @DeleteMapping(path = "/users/{id}")
    public String deleteUser(HttpServletRequest request, @PathVariable int id) {
        String token = null;

        // Extract the token from cookies
        if (request.getCookies() != null) {
            for (var cookie : request.getCookies()) {
                if (cookie.getName().equals("auth_token")) {
                    token = cookie.getValue();
                }
            }
        }

        if (token == null) {
            throw new IllegalArgumentException("Token not found");
        }

        return userService.deleteUser(id);
    }

    @PostMapping(path = "/users/logout")
    public ResponseEntity<String> logout(HttpServletRequest request, HttpServletResponse response) {

        // Clear cookies
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                cookie.setValue(null);
                cookie.setPath("/");
                cookie.setMaxAge(0);
                response.addCookie(cookie);
            }
        }

        return ResponseEntity.ok("Logged out successfully");
    }

    @PostMapping("/suspend/{id}")
    public ResponseEntity<String> suspendUser(@PathVariable int id) {
        userService.suspendUser(id);
        return ResponseEntity.ok("User suspended successfully");
    }

}
