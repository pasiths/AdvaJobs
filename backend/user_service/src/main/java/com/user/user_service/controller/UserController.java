package com.user.user_service.controller;

import com.user.user_service.data.User;
import com.user.user_service.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping(path = "/test")
    public String getTest() {
        return userService.apiTest();
    }

    @PostMapping(path = "/users/auth")
    public User createUser(@RequestBody User user) {
        return userService.createUser(user);
    }

    @GetMapping(path = "/users/auth")
    public List<User> getUsers() {
        return userService.getUsers();
    }

    @GetMapping(path = "/users/auth/{id}")
    public User getUser(@PathVariable int id) {
        return userService.getUser(id);
    }
}