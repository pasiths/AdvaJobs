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
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
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

        String token = TokenUtil.generateToken(user.getId(), user.getIsVerified().toString(), "user");

        ResponseCookie cookie = ResponseCookie.from("auth_token", token).httpOnly(false).secure(true).path("/")
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

        String token = TokenUtil.generateToken(user.getId(), user.getIsVerified().toString(), "user");

        ResponseCookie cookie = ResponseCookie.from("auth_token", token).httpOnly(false).secure(true).path("/")
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

    @PostMapping("/users/suspend/{id}")
    public ResponseEntity<String> suspendUser(@PathVariable int id) {
        userService.suspendUser(id);
        return ResponseEntity.ok("User suspended successfully");
    }

    @Value("${file.upload-dir}")
    private String uploadDir;

    @GetMapping("/uploads/{filename}")
    public ResponseEntity<Resource> viewFile(@PathVariable String filename) {
        try {
            // Construct the file path
            Path filePath = Paths.get(uploadDir).resolve(filename).normalize();
            Resource resource = new UrlResource(filePath.toUri());

            // Check if the file exists and is readable
            if (resource.exists() && resource.isReadable()) {
                // Determine the content type
                String contentType = Files.probeContentType(filePath);
                if (contentType == null) {
                    contentType = "application/octet-stream";
                }

                // Serve the file as inline for browser preview
                return ResponseEntity.ok()
                        .contentType(MediaType.parseMediaType(contentType))
                        .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + resource.getFilename() + "\"")
                        .body(resource);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }
        } catch (MalformedURLException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @GetMapping("/cv/{userId}")
    public ResponseEntity<Resource> getUserCv(@PathVariable int userId) {
        User user = userService.getUser(userId);
        if (user.getCv() == null) {
            throw new RuntimeException("No CV found for user with ID " + userId);
        }

        // Load the CV file
        Path filePath = Paths.get(user.getCv());
        Resource resource;
        try {
            resource = new UrlResource(filePath.toUri());
            if (!resource.exists() || !resource.isReadable()) {
                throw new RuntimeException("Could not read the file: " + user.getCv());
            }
        } catch (MalformedURLException e) {
            throw new RuntimeException("Error while reading file", e);
        }

        // Return the file as a response
        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_PDF)
                .body(resource);
    }

}
