package com.jobs.job_service.Data;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "Jobs")
public class Jobs {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "title", nullable = false, length = 255)
    @NotBlank(message = "Title is mandatory")
    @Size(max = 255, message = "Title must not exceed 255 characters")
    private String title;

    @Column(name = "location", nullable = false, length = 255)
    @NotBlank(message = "Location is mandatory")
    @Size(max = 255, message = "Location must not exceed 255 characters")
    private String location;

    @Column(name = "close_date", nullable = false)
    @NotNull(message = "Close date is mandatory")
    private LocalDate closeDate;

    @Column(name = "description", nullable = false, length = 255)
    @NotBlank(message = "Description is mandatory")
    @Size(max = 255, message = "Description must not exceed 255 characters")
    private String description;

    @Column(name = "phone", nullable = false, length = 15)
    @NotBlank(message = "Phone number is mandatory")
    @Size(max = 15, message = "Phone number must not exceed 15 characters")
    @Pattern(regexp = "\\d{10,15}", message = "Phone number must be between 10 to 15 digits")
    private String phone;

    @Column(name = "email", nullable = false, length = 255)
    @NotBlank(message = "Email is mandatory")
    @Email(message = "Email should be valid")
    @Size(max = 255, message = "Email must not exceed 255 characters")
    private String email;

    @Column(name = "content", nullable = false, length = 255)
    @NotBlank(message = "Content is mandatory")
    @Size(max = 255, message = "Content must not exceed 255 characters")
    private String content;

    @Column(name = "job_type", nullable = false, length = 255)
    @NotBlank(message = "Job type is mandatory")
    @Size(max = 255, message = "Job type must not exceed 255 characters")
    private String jobType;

    @Column(name = "salary", nullable = false)
    @Positive(message = "Salary must be a positive number")
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

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private Status status = Status.Active; // Default value

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}