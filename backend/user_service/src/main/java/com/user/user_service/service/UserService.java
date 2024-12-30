package com.user.user_service.service;

import com.user.user_service.data.Gender;
import com.user.user_service.data.User;
import com.user.user_service.data.UserDto;
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
    @Autowired
    private com.user.user_service.User user;

    public String apiTest() {
        return "Hello User";
    }

    public User registerUser(UserDto userDto) {

        if (userDto.getProfilePic() != null && userDto.getProfilePic().getSize() > 10 * 1024 * 1024) { // 2MB limit
            throw new IllegalArgumentException("Profile picture size exceeds 10MB");
        }

        if (userDto.getCv() != null && !userDto.getCv().getOriginalFilename().endsWith(".pdf")) {
            throw new IllegalArgumentException("CV must be a PDF file");
        }

        User user = new User();
        user.setFullName(userDto.getFullName());
        user.setEmail(userDto.getEmail());
        user.setPhoneNum(userDto.getPhoneNum());
        user.setLocation(userDto.getLocation());
        user.setGender(Gender.valueOf(userDto.getGender().toUpperCase()));
        user.setPassword(passwordEncoder.encode(userDto.getPassword()));

        if (userDto.getProfilePic() != null && !userDto.getProfilePic().isEmpty()) {
            String profilePicPath = saveFile(userDto.getProfilePic());
            user.setProfilePic(profilePicPath);
        }

        if (userDto.getCv() != null && !userDto.getCv().isEmpty()) {
            String cvPath = saveFile(userDto.getCv());
            user.setCv(cvPath);
        }
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
            return filePath.toString().replace("\\", "/");
        } catch (IOException e) {
            throw new RuntimeException("Failed to store file", e);
        }
    }
}
