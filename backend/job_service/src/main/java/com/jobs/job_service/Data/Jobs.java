package com.jobs.job_service.Data;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name="Jobs")
public class Jobs {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int Id;

    public int getId() {
        return Id;
    }

    public void setId(int id) {
        Id = id;
    }

    @Column(name = "Title",nullable = false,length = 255)
    private String Title;

    public String getTitle() {
        return Title;
    }

    public void setTitle(String title) {
        Title = title;
    }

    @Column(name = "Location",nullable = false,length = 255)
    private String Location;

    public String getLocation() {
        return Location;
    }

    public void setLocation(String location) {
        Location = location;
    }

    @Column(name = "CloseDate",nullable = false)
    private LocalDate CloseDate;

    public LocalDate getCloseDate() {
        return CloseDate;
    }

    public void setCloseDate(LocalDate closeDate) {
        CloseDate = closeDate;
    }

    @Column(name = "Description",nullable = false,length = 255)
    private String Description;

    public String getDescription() {
        return Description;
    }

    public void setDescription(String description) {
        Description = description;
    }

    @Column(name = "Phone",nullable = false,length = 255)
    private String Phone;


    public String getPhone() {
        return Phone;
    }

    public void setPhone(String phone) {
        this.Phone = phone;
    }

    @Column(name = "Email",nullable = false,length = 255)
    private String Email;


    public String getEmail() {
        return Email;
    }

    public void setEmail(String email) {
        this.Email = email;
    }

    @Column(name = "Content",nullable = false,length = 255)
    private String Content;

    public String getContent() {
        return Content;
    }

    public void setContent(String content) {
        Content = content;
    }

}
