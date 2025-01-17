package com.application.application_service.data;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "applications")
public class Application {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;


    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "email", nullable = false)
    private String email;


    @Column(name = "telephone_no", nullable = false)
    private String telephoneNo;

    @Column(name = "company_name", nullable = false)
    private String companyName;

    @Column(name = "job_title", nullable = false)
    private String jobTitle;


    @Column(name = "message", length = 500, nullable = false)
    private String message;

    @Column(name = "cv")
    private String cvPath;

    @Column(name = "date_applied", nullable = false)
    private LocalDateTime dateApplied;

    @Column(name = "user_id", nullable = false)
    private int userId;

    @Column(name = "company_id", nullable = false)
    private int companyId;

    @Column(name = "job_id", nullable = false)
    private int jobId;


    @Enumerated(EnumType.STRING)
    private Status status = Status.PENDING;


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

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public @NotBlank(message = "Name is required") String getName() {
        return name;
    }

    public void setName(@NotBlank(message = "Name is required") String name) {
        this.name = name;
    }

    public @Email(message = "Invalid email format") @NotBlank(message = "Email is required") String getEmail() {
        return email;
    }

    public void setEmail(@Email(message = "Invalid email format") @NotBlank(message = "Email is required") String email) {
        this.email = email;
    }

    public @Pattern(regexp = "^\\+?[0-9]{10,15}$", message = "Invalid telephone number format") @NotBlank(message = "Telephone number is required") String getTelephoneNo() {
        return telephoneNo;
    }

    public void setTelephoneNo(@Pattern(regexp = "^\\+?[0-9]{10,15}$", message = "Invalid telephone number format") @NotBlank(message = "Telephone number is required") String telephoneNo) {
        this.telephoneNo = telephoneNo;
    }

    public @NotBlank(message = "Company name is required") String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(@NotBlank(message = "Company name is required") String companyName) {
        this.companyName = companyName;
    }

    public @NotBlank(message = "Job title is required") String getJobTitle() {
        return jobTitle;
    }

    public void setJobTitle(@NotBlank(message = "Job title is required") String jobTitle) {
        this.jobTitle = jobTitle;
    }

    public @NotBlank(message = "Message is required") @Size(max = 500, message = "Message must not exceed 500 characters") String getMessage() {
        return message;
    }

    public void setMessage(@NotBlank(message = "Message is required") @Size(max = 500, message = "Message must not exceed 500 characters") String message) {
        this.message = message;
    }

    public @NotNull(message = "Date applied is required") LocalDateTime getDateApplied() {
        return dateApplied;
    }

    public void setDateApplied(@NotNull(message = "Date applied is required") LocalDateTime dateApplied) {
        this.dateApplied = dateApplied;
    }

    @Positive(message = "User ID must be positive")
    public int getUserId() {
        return userId;
    }

    public void setUserId(@Positive(message = "User ID must be positive") int userId) {
        this.userId = userId;
    }

    public String getCvPath() {
        return cvPath;
    }

    public void setCvPath(String cvPath) {
        this.cvPath = cvPath;
    }

    @Positive(message = "Company ID must be positive")
    public int getCompanyId() {
        return companyId;
    }

    public void setCompanyId(@Positive(message = "Company ID must be positive") int companyId) {
        this.companyId = companyId;
    }

    @Positive(message = "Job ID must be positive")
    public int getJobId() {
        return jobId;
    }

    public void setJobId(@Positive(message = "Job ID must be positive") int jobId) {
        this.jobId = jobId;
    }

    public @NotBlank(message = "Status is required") @Pattern(regexp = "^(PENDING|APPROVED|REJECTED|DELETED)$", message = "Status must be PENDING, APPROVED, REJECTED, or DELETED") Status getStatus() {
        return status;
    }

    public void setStatus(@NotBlank(message = "Status is required") @Pattern(regexp = "^(PENDING|APPROVED|REJECTED|DELETED)$", message = "Status must be PENDING, APPROVED, REJECTED, or DELETED") Status status) {
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
