package com.user.user_service.service;

import com.user.user_service.data.User;
import com.user.user_service.data.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.List;


import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public String apiTest() {
        return "Hello User";
    }

    public User registerUser(String fullName, String email, String phoneNum, String location, String gender, String password, MultipartFile cv, MultipartFile profilePic) {
        User user = new User();
        user.setFullName(fullName);
        user.setEmail(email);
        user.setPhoneNum(phoneNum);
        user.setLocation(location);
        user.setGender(gender);
        user.setPassword(passwordEncoder.encode(password));

        if (profilePic != null && !profilePic.isEmpty()) {
            String profilePicPath = saveFile(profilePic);
            user.setProfilePic(profilePicPath);
        }

        if (cv != null && !cv.isEmpty()) {
            String cvPath = saveFile(cv);
            user.setCv(cvPath);
        }

        user.setIsVerified("false");
        user.setDate(LocalDateTime.now());
        user.setStatus(1);
        return userRepo.save(user);
    }

    public List<User> getUsers() {
        return userRepo.findAll();
    }

    public User getUser(int id) {
        return userRepo.findById(id).orElse(null);
    }

    public User updateUser(int id, User user) {
        User us = new User();
        us.setId(id);
        us.setFullName(user.getFullName());
        us.setEmail(user.getEmail());
        us.setPhoneNum(user.getPhoneNum());
        us.setLocation(user.getLocation());
        us.setGender(user.getGender());
        us.setCv("null");
        us.setProfilePic("null");

        // Hash the password before saving
        us.setPassword(passwordEncoder.encode(user.getPassword()));

        us.setIsVerified("false");
        us.setDate(LocalDateTime.now());
        us.setStatus(1);
        return userRepo.save(us);
    }

    public boolean deleteUser(int id) {
        User user = userRepo.findById(id).orElse(null);
        if (user != null) {
            userRepo.delete(user);
            return true;
        }
        return false;
    }

    public boolean deleteUser(User user) {
        userRepo.delete(user);
        return true;
    }

    public User loginUser(User user) {
        User us = userRepo.getUsersByEmail(user.getEmail());
        if (us != null) {
            if (passwordEncoder.matches(user.getPassword(), us.getPassword())) {
                return us;
            }
        }

        return null;
    }

    @Value("${file.upload-dir}")
    private String uploadDir;


    private String saveFile(MultipartFile file) {
        try {
            String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
            Path filePath = Paths.get(uploadDir + fileName);
            Files.createDirectories(filePath.getParent());
            Files.write(filePath, file.getBytes());
            return filePath.toString();
        } catch (IOException e) {
            throw new RuntimeException("Failed to store file", e);
        }
    }
}
