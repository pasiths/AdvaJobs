package com.application.application_service.service;

import com.application.application_service.data.Application;
import com.application.application_service.data.ApplicationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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
        Optional<Application> application = applicationRepository.findById(id);
        return application.orElse(null); // Return null if not found
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

    // Method to get applications by jobId
    public List<Application> getApplicationsByJobId(int jobId) {
        return applicationRepository.findApplicationsByJobId(jobId);
    }

//    // Create a new application
//    public Application createApplication(Application application) {
//        return applicationRepository.save(application);
//    }

//    public Application createApplication(Application application) {
//        System.out.println("Saving application: " + application);  // Add log to check
//        return applicationRepository.save(application);
//    }

    // Create a new application
    public Application createApplication(Application application) {
        // Ensure status is always "PENDING" when creating a new application
        application.setStatus("PENDING");

        return applicationRepository.save(application);
    }


    // Update application status
    public Application updateApplicationStatus(int id, String status) {
        Application application = applicationRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Application not found"));
        application.setStatus(status);
        return applicationRepository.save(application);
    }

    // Mark application as deleted (soft delete)
    public Application deleteApplication(int id) {
        Application application = applicationRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Application not found"));

        // Update the status to DELETED
        application.setStatus("DELETED");

        // Save the updated application
        return applicationRepository.save(application);
    }

//    // Mark application as deleted
//    public Application markApplicationAsDeleted(int id) {
//        Application application = applicationRepository.findById(id)
//                .orElseThrow(() -> new IllegalArgumentException("Application not found"));
//        application.setDeleted(true); // Assuming there's a 'deleted' field in the Application entity
//        return applicationRepository.save(application);
//    }

//    // Delete application
//    public void deleteApplication(int id) {
//        if (!applicationRepository.existsById(id)) {
//            throw new IllegalArgumentException("Application not found");
//        }
//        applicationRepository.deleteById(id);
//    }

}
