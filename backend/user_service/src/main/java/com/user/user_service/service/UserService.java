package com.user.user_service.service;

import com.user.user_service.data.User;
import com.user.user_service.data.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepo;

    public String apiTest() {
        return "Hello User";
    }

    public User createUser(User user) {
        return userRepo.save(user);
    }

    public List<User> getUsers() {
        return userRepo.findAll();
    }
}
