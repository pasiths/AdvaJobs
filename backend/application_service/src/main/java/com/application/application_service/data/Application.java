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

    @NotBlank(message = "Message is required")
    @Size(max = 500, message = "Message must not exceed 500 characters")
    @Column(name = "message", length = 500)
    private String message;


    @NotNull(message = "Date applied is required")
    @Column(name = "date_applied", nullable = false)
    private LocalDateTime dateApplied;

    @NotBlank(message = "Status is required")
    @Pattern(regexp = "^(PENDING|APPROVED|REJECTED)$", message = "Status must be PENDING, APPROVED, or REJECTED")
    @Column(name = "status", nullable = false)
    private String status;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @Positive(message = "User ID must be positive")
    @Column(name = "user_id", nullable = false)
    private int userId;

    @Positive(message = "Company ID must be positive")
    @Column(name = "company_id", nullable = false)
    private int companyId;

    @Positive(message = "Job ID must be positive")
    @Column(name = "job_id", nullable = false)
    private int jobId;

    public @NotBlank(message = "Message is required") @Size(max = 500, message = "Message must not exceed 500 characters") String getMessage() {
        return message;
    }

    public void setMessage(@NotBlank(message = "Message is required") @Size(max = 500, message = "Message must not exceed 500 characters") String message) {
        this.message = message;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }


    public @NotNull(message = "Date applied is required") LocalDateTime getDateApplied() {
        return dateApplied;
    }

    public void setDateApplied(@NotNull(message = "Date applied is required") LocalDateTime dateApplied) {
        this.dateApplied = dateApplied;
    }

    public @NotBlank(message = "Status is required") @Pattern(regexp = "^(PENDING|APPROVED|REJECTED)$", message = "Status must be PENDING, APPROVED, or REJECTED") String getStatus() {
        return status;
    }

    public void setStatus(@NotBlank(message = "Status is required") @Pattern(regexp = "^(PENDING|APPROVED|REJECTED)$", message = "Status must be PENDING, APPROVED, or REJECTED") String status) {
        this.status = status;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    @Positive(message = "User ID must be positive")
    public int getUserId() {
        return userId;
    }

    public void setUserId(@Positive(message = "User ID must be positive") int userId) {
        this.userId = userId;
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
}
