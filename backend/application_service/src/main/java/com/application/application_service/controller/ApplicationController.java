package com.application.application_service.controller;

import com.application.application_service.data.Application;
import com.application.application_service.service.ApplicationService;
import com.application.application_service.dto.StatusUpdateRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/applications")
public class ApplicationController {

    @Autowired
    private ApplicationService applicationService;

    @PostMapping
    public ResponseEntity<Application> createApplication(@RequestBody Application application) throws IOException {
        Application createdApplication = applicationService.createApplication(application);
        return ResponseEntity.ok(createdApplication);
    }

    // Get all applications
//    @GetMapping
//    public ResponseEntity<List<Application>> getApplications() {
//        List<Application> applications = applicationService.getApplications();
//        return ResponseEntity.ok(applications);
//    }
//
//    // Get application by ID
//    @GetMapping("/{id}")
//    public ResponseEntity<Application> getApplicationById(@PathVariable int id) {
//        try {
//            Application application = applicationService.getApplicationById(id);
//            return ResponseEntity.ok(application);
//        } catch (IllegalArgumentException e) {
//            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
//        }
//    }
//
//    // Get applications by status
//    @GetMapping(params = "status")
//    public ResponseEntity<?> getApplicationsByStatus(@RequestParam String status) {
//        try {
//            List<Application> applications = applicationService.getApplicationsByStatus(status);
//            if (applications.isEmpty()) {
//                return ResponseEntity.status(HttpStatus.NOT_FOUND)
//                        .body("No applications found with status: " + status);
//            }
//            return ResponseEntity.ok(applications);
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
//                    .body("An error occurred while fetching applications: " + e.getMessage());
//        }
//    }
//
//    // Get applications by user ID
//    @GetMapping(params = "userId")
//    public ResponseEntity<?> getApplicationsByUser(@RequestParam int userId) {
//        try {
//            List<Application> applications = applicationService.getApplicationsByUser(userId);
//            if (applications.isEmpty()) {
//                return ResponseEntity.status(HttpStatus.NOT_FOUND)
//                        .body("No applications found for user ID: " + userId);
//            }
//            return ResponseEntity.ok(applications);
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
//                    .body("An error occurred while fetching applications: " + e.getMessage());
//        }
//    }
//
//    // Get applications by company ID
//    @GetMapping(params = "companyId")
//    public ResponseEntity<?> getApplicationsByCompany(@RequestParam int companyId) {
//        try {
//            List<Application> applications = applicationService.getApplicationsByCompany(companyId);
//            if (applications.isEmpty()) {
//                return ResponseEntity.status(HttpStatus.NOT_FOUND)
//                        .body("No applications found for company ID: " + companyId);
//            }
//            return ResponseEntity.ok(applications);
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
//                    .body("An error occurred while fetching applications: " + e.getMessage());
//        }
//    }
//
//    // Get applications by job ID
//    @GetMapping(params = "jobId")
//    public ResponseEntity<?> getApplicationsByJobId(@RequestParam int jobId) {
//        try {
//            List<Application> applications = applicationService.getApplicationsByJobId(jobId);
//            if (applications.isEmpty()) {
//                return ResponseEntity.status(HttpStatus.NOT_FOUND)
//                        .body("No applications found for job ID: " + jobId);
//            }
//            return ResponseEntity.ok(applications);
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
//                    .body("An error occurred while fetching applications: " + e.getMessage());
//        }
//    }
//
//    // Get applications by email
//    @GetMapping(params = "email")
//    public ResponseEntity<?> getApplicationsByEmail(@RequestParam String email) {
//        List<Application> applications = applicationService.getApplicationsByEmail(email);
//
//        if (applications.isEmpty()) {
//            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No applications found with email: " + email);
//        }
//        return ResponseEntity.ok(applications);
//    }
//
//    // Get applications by name
//    @GetMapping(params = "name")
//    public ResponseEntity<?> getApplicationsByName(@RequestParam String name) {
//        List<Application> applications = applicationService.getApplicationsByName(name);
//
//        if (applications.isEmpty()) {
//            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No applications found with name: " + name);
//        }
//        return ResponseEntity.ok(applications);
//    }
//
//    // Get applications by company name
//    @GetMapping(params = "companyName")
//    public ResponseEntity<?> getApplicationsByCompanyName(@RequestParam String companyName) {
//        List<Application> applications = applicationService.getApplicationsByCompanyName(companyName);
//
//        if (applications.isEmpty()) {
//            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No applications found with company name: " + companyName);
//        }
//        return ResponseEntity.ok(applications);
//    }
//
//    // Get applications by job title
//    @GetMapping(params = "jobTitle")
//    public ResponseEntity<?> getApplicationsByJobTitle(@RequestParam String jobTitle) {
//        List<Application> applications = applicationService.getApplicationsByJobTitle(jobTitle);
//
//        if (applications.isEmpty()) {
//            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No applications found with job title: " + jobTitle);
//        }
//        return ResponseEntity.ok(applications);
//    }
//
//    // Create a new application
//    @PostMapping
//    public ResponseEntity<?> createApplication(@RequestBody Application application) {
//        try {
//            Application createdApplication = applicationService.createApplication(application);
//            return ResponseEntity.status(HttpStatus.CREATED).body(createdApplication);
//        } catch (IllegalArgumentException e) {
//            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
//                    .body("An error occurred while creating the application: " + e.getMessage());
//        }
//    }
//
//    // Update application status
//    @PutMapping("/{id}")
//    public ResponseEntity<?> updateApplicationStatus(@PathVariable int id, @RequestBody StatusUpdateRequest statusRequest) {
//        try {
//            String status = statusRequest.getStatus();
//            if (status == null || status.isEmpty()) {
//                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
//                        .body("Status is required to update the application");
//            }
//            Application updatedApplication = applicationService.updateApplicationStatus(id, status);
//            return ResponseEntity.ok(updatedApplication);
//        } catch (IllegalArgumentException e) {
//            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
//                    .body("An error occurred while updating application status: " + e.getMessage());
//        }
//    }
//
//    // Soft delete application (mark as DELETED)
//    @DeleteMapping("/{id}")
//    public ResponseEntity<?> deleteApplication(@PathVariable int id) {
//        try {
//            Application deletedApplication = applicationService.deleteApplication(id);
//            return ResponseEntity.ok(deletedApplication);
//        } catch (IllegalArgumentException e) {
//            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
//                    .body("An error occurred while deleting the application: " + e.getMessage());
//        }
//    }
}
