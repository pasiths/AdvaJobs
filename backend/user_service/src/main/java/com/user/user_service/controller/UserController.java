package com.user.user_service.controller;

import com.user.user_service.data.User;
import com.user.user_service.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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

    // register user
    @PostMapping(path = "/users/")
    public User createUser(@RequestBody User user) {
        return userService.createUser(user);
    }

    // login user
    @PostMapping(path = "/users/login")
    public User login(@RequestBody User user) {
        return userService.loginUser(user);
    }

    // get all users
    @GetMapping(path = "/users/auth")
    public List<User> getUsers() {
        return userService.getUsers();
    }

    // get user by id
    @GetMapping(path = "/users/{id}")
    public User getUser(@PathVariable int id) {
        return userService.getUser(id);
    }

    // update user
    @PutMapping(path = "/users/{id}")
    public User updateUser(@PathVariable int id, @RequestBody User user) {
        return userService.updateUser(id, user);
    }

    // delete user
    @DeleteMapping(path = "/users/{id}")
    public boolean deleteUser(@PathVariable int id) {
        return userService.deleteUser(id);
    }

}
