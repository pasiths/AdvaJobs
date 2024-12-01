package com.user.user_service.service;

import com.user.user_service.data.User;
import com.user.user_service.data.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public String apiTest() {
        return "Hello User";
    }

    public User createUser(User user) {
        User us = new User();
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
}
