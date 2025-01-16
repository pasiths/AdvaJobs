package com.application.application_service.service;

import com.application.application_service.data.Application;
import com.application.application_service.data.ApplicationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ApplicationService {

    @Autowired
    private ApplicationRepository applicationRepository;

    // Get all applications
    public List<Application> getApplications() {
        return applicationRepository.findAll();
    }

    // Get application by ID
    public Application getApplicationById(int id) {
        return applicationRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Application with ID " + id + " not found"));
    }

    // Get applications by status
    public List<Application> getApplicationsByStatus(String status) {
        return applicationRepository.findByStatus(status);
    }

    // Get applications by user ID
    public List<Application> getApplicationsByUser(int userId) {
        return applicationRepository.findByUserId(userId);
    }

    // Get applications by company ID
    public List<Application> getApplicationsByCompany(int companyId) {
        return applicationRepository.findApplicationsByCompanyId(companyId);
    }

    // Get applications by job ID
    public List<Application> getApplicationsByJobId(int jobId) {
        return applicationRepository.findApplicationsByJobId(jobId);
    }

    public List<Application> getApplicationsByEmail(String email) {
        return applicationRepository.findByEmail(email);
    }

    public List<Application> getApplicationsByName(String name) {
        return applicationRepository.findByName(name);
    }

    public List<Application> getApplicationsByCompanyName(String companyName) {
        return applicationRepository.findByCompanyName(companyName);
    }

    public List<Application> getApplicationsByJobTitle(String jobTitle) {
        return applicationRepository.findByJobTitle(jobTitle);
    }

    // Create a new application
    public Application createApplication(Application application) {
        // Ensure the status is set to "PENDING" when creating a new application
        application.setStatus("PENDING");

        // Validate mandatory fields
//        if (application.getUsername() == null || application.getUsername().isEmpty()) {
//            throw new IllegalArgumentException("Username is required");
//        }
        if (application.getEmail() == null || application.getEmail().isEmpty()) {
            throw new IllegalArgumentException("Email is required");
        }
        if (application.getName() == null || application.getName().isEmpty()) {
            throw new IllegalArgumentException("Name is required");
        }
        if (application.getTelephoneNo() == null || application.getTelephoneNo().isEmpty()) {
            throw new IllegalArgumentException("Telephone number is required");
        }
        if (application.getCompanyName() == null || application.getCompanyName().isEmpty()) {
            throw new IllegalArgumentException("Company name is required");
        }
        if (application.getJobTitle() == null || application.getJobTitle().isEmpty()) {
            throw new IllegalArgumentException("Job title is required");
        }

        // Save the application
        return applicationRepository.save(application);
    }

    // Update application status
    public Application updateApplicationStatus(int id, String status) {
        Application application = applicationRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Application with ID " + id + " not found"));
        application.setStatus(status);
        return applicationRepository.save(application);
    }

    // Soft delete application (mark as DELETED)
    public Application deleteApplication(int id) {
        Application application = applicationRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Application with ID " + id + " not found"));
        application.setStatus("DELETED");
        return applicationRepository.save(application);
    }
}
