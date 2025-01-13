package com.user.user_service.service;

import com.user.user_service.data.*;
import com.user.user_service.dto.LoginRequestDto;
import com.user.user_service.dto.UpdateDto;
import com.user.user_service.dto.UserDto;
import com.user.user_service.utils.OtpUtil;
import com.user.user_service.utils.SendEmail;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Objects;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private OtpUtil otpUtil;
    @Autowired
    private SendEmail sendEmail;

    public String apiTest() {
        return "Hello User";
    }

    @SuppressWarnings("null")
    public User registerUser(UserDto userDto) throws MessagingException {

        if (userDto.getProfilePic() != null && userDto.getProfilePic().getSize() > 10 * 1024 * 1024) { // 2MB limit
            throw new IllegalArgumentException("Profile picture size exceeds 10MB");
        }

        if (userDto.getCv() != null && !userDto.getCv().getOriginalFilename().endsWith(".pdf")) {
            throw new IllegalArgumentException("CV must be a PDF file");
        }

        if (userRepo.getUsersByEmail(userDto.getEmail()) != null) {
            throw new IllegalArgumentException("A user with this email already exists.");
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

        String otp = otpUtil.generateOtp(user.getEmail());

        sendEmail.sendOtpEmail(user.getEmail(), otp);

        return userRepo.save(user);
    }

    public User loginUser(LoginRequestDto loginRequestDto) throws MessagingException {
        User us = userRepo.getUsersByEmail(loginRequestDto.getEmail());
        if (us == null || us.getStatus() == Status.Inactive) {
            throw new IllegalArgumentException("User not found");
        }

        if (!passwordEncoder.matches(loginRequestDto.getPassword(), us.getPassword())) {
            throw new IllegalArgumentException("Invalid password");
        }
        if (us.getStatus() == Status.Suspend) {
            throw new IllegalArgumentException("User is suspended");
        }

        if (us.getIsVerified() == VerificationStatus.Unverified) {
            String otp = otpUtil.generateOtp(us.getEmail());

            sendEmail.sendOtpEmail(us.getEmail(), otp);
        }

        return us;
    }

    public void resendOtp(String email) throws MessagingException {
        User us = userRepo.getUsersByEmail(email);
        if (us == null) {
            throw new IllegalArgumentException("User not found");
        }

        if (us.getStatus() == Status.Inactive) {
            throw new IllegalArgumentException("User not found");
        }

        if (us.getIsVerified() == VerificationStatus.Verified) {
            throw new IllegalArgumentException("User is already verified");
        }

        String otp = otpUtil.generateOtp(us.getEmail());

        sendEmail.sendOtpEmail(us.getEmail(), otp);
    }

    public List<User> getUsers() {
        return userRepo.findAll();
    }

    public User getUser(int id) {
        User us = userRepo.findById(id).orElse(null);

        if (us == null) {
            throw new IllegalArgumentException("User not found");
        }

        if (us.getStatus() == Status.Suspend) {
            throw new IllegalArgumentException("User is suspended");
        }

        if (us.getStatus() == Status.Inactive) {
            throw new IllegalArgumentException("User not found");
        }

        return us;
    }

    public User updateUser(int id, UpdateDto userDto) {

        User us = userRepo.findById(id).orElse(null);

        if (us == null) {
            throw new IllegalArgumentException("User not found");
        }

        if (us.getStatus() == Status.Suspend) {
            throw new IllegalArgumentException("User is suspended");
        }

        if (us.getStatus() == Status.Inactive) {
            throw new IllegalArgumentException("User not found");
        }

        if (userDto.getProfilePic() != null && userDto.getProfilePic().getSize() > 10 * 1024 * 1024) { // 2MB limit
            throw new IllegalArgumentException("Profile picture size exceeds 10MB");
        }

        if (userDto.getCv() != null && !userDto.getCv().getOriginalFilename().endsWith(".pdf")) {
            throw new IllegalArgumentException("CV must be a PDF file");
        }

        if (!Objects.equals(userDto.getEmail(), us.getEmail())) {
            if (userRepo.getUsersByEmail(userDto.getEmail()) != null) {
                throw new IllegalArgumentException("A user with this email already exists.");
            }
        }

        us.setFullName(userDto.getFullName());
        us.setEmail(userDto.getEmail());
        us.setPhoneNum(userDto.getPhoneNum());
        us.setLocation(userDto.getLocation());
        us.setGender(Gender.valueOf(userDto.getGender().toUpperCase()));

        if (userDto.getProfilePic() != null && !userDto.getProfilePic().isEmpty()) {
            String profilePicPath = saveFile(userDto.getProfilePic());
            us.setProfilePic(profilePicPath);
        }

        if (userDto.getCv() != null && !userDto.getCv().isEmpty()) {
            String cvPath = saveFile(userDto.getCv());
            us.setCv(cvPath);
        }

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
