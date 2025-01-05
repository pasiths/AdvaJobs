package com.jobs.job_service.Data;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "Jobs")
public class Jobs {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "title", nullable = false, length = 255)
    private String title;

    @Column(name = "location", nullable = false, length = 255)
    private String location;

    @Column(name = "close_date", nullable = false)
    private LocalDate closeDate;

    @Column(name = "description", nullable = false, length = 255)
    private String description;

    @Column(name = "phone", nullable = false, length = 255)
    private String phone;

    @Column(name = "email", nullable = false, length = 255)
    private String email;

    @Column(name = "content", nullable = false, length = 255)
    private String content;

    @Column(name = "job_type", nullable = false, length = 255) // Added jobType field
    private String jobType;

    @Column(name = "salary", nullable = false) // Added salary field
    private double salary;

    // Getters and Setters

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public LocalDate getCloseDate() {
        return closeDate;
    }

    public void setCloseDate(LocalDate closeDate) {
        this.closeDate = closeDate;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getJobType() {
        return jobType;
    }

    public void setJobType(String jobType) {
        this.jobType = jobType;
    }

    public double getSalary() {
        return salary;
    }

    public void setSalary(double salary) {
        this.salary = salary;
    }
}
