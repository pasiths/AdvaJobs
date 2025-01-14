package com.application.application_service.controller;

import com.application.application_service.data.Application;
import com.application.application_service.service.ApplicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.application.application_service.dto.StatusUpdateRequest;

import java.util.List;

@RestController
public class ApplicationController {

    @Autowired
    private ApplicationService applicationService;

    // Get all applications
    @GetMapping(path = "/applications")
    public List<Application> getApplications() {
        return applicationService.getApplications();
    }

    // Get application by ID
    @GetMapping(path = "/applications/{id}")
    public Application getApplicationById(@PathVariable int id) {
        return applicationService.getApplicationById(id);
    }

    // Get applications by status
    @GetMapping(path = "/applications", params = "status")
    public ResponseEntity<?> getApplicationsByStatus(@RequestParam String status) {
        try {
            List<Application> applications = applicationService.getApplicationsByStatus(status);

            if (applications.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("No applications found with status: " + status);
            }

            return ResponseEntity.ok(applications);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An error occurred while fetching applications: " + e.getMessage());
        }
    }

    // Get applications by user ID
    @GetMapping(path = "/applications", params = "userId")
    public ResponseEntity<?> getApplicationsByUser(@RequestParam int userId) {
        try {
            List<Application> applications = applicationService.getApplicationsByUser(userId);

            if (applications.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("No applications found for user ID: " + userId);
            }

            return ResponseEntity.ok(applications);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An error occurred while fetching applications: " + e.getMessage());
        }
    }

    // Get applications by company ID
    @GetMapping(path = "/applications", params = "companyId")
    public ResponseEntity<?> getApplicationsByCompany(@RequestParam int companyId) {
        try {
            // Fetch applications by company ID using the repository method
            List<Application> applications = applicationService.getApplicationsByCompany(companyId);

            if (applications.isEmpty()) {
                // If no applications are found, return a 404 response
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("No applications found for company ID: " + companyId);
            }

            // If applications are found, return them in the response
            return ResponseEntity.ok(applications);
        } catch (Exception e) {
            // Handle any errors and return an internal server error response
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An error occurred while fetching applications: " + e.getMessage());
        }
    }

    // Get applications by jobId
    @GetMapping(path = "/applications", params = "jobId")
    public ResponseEntity<?> getApplicationsByJobId(@RequestParam int jobId) {
        try {
            List<Application> applications = applicationService.getApplicationsByJobId(jobId);

            if (applications.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("No applications found for job ID: " + jobId);
            }

            return ResponseEntity.ok(applications);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An error occurred while fetching applications: " + e.getMessage());
        }
    }

    // Create a new application
    @PostMapping(path = "/applications")
    public Application createApplication(@RequestBody Application application) {
        return applicationService.createApplication(application);
    }

//    // Update application status
//    @PutMapping(path = "/applications/{id}/status")
//    public ResponseEntity<?> updateApplicationStatus(@PathVariable int id, @RequestParam String status) {
//        try {
//            Application updatedApplication = applicationService.updateApplicationStatus(id, status);
//            return ResponseEntity.ok(updatedApplication);
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
//                    .body("An error occurred while updating application status: " + e.getMessage());
//        }
//    }

//    // Update application status
//    @PutMapping(path = "/applications/{id}", params = "status")
//    public ResponseEntity<?> updateApplicationStatus(@PathVariable int id, @RequestParam String status) {
//        try {
//            // Call the service to update the application status
//            Application updatedApplication = applicationService.updateApplicationStatus(id, status);
//
//            // Return the updated application with a 200 OK status
//            return ResponseEntity.ok(updatedApplication);
//        } catch (Exception e) {
//            // Handle any exceptions and return an internal server error
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
//                    .body("An error occurred while updating application status: " + e.getMessage());
//        }
//    }

    @PutMapping("/applications/{id}")
    public ResponseEntity<Application> updateApplicationStatus(@PathVariable int id, @RequestBody StatusUpdateRequest statusRequest) {
        try {
            // Extract the 'status' from the request body
            String status = statusRequest.getStatus();

            // Validate the status (optional, but good practice)
            if (status == null || status.isEmpty()) {
                return ResponseEntity.badRequest().body(null);  // Return bad request if status is missing or empty
            }

            // Call the service to update the application status
            Application updatedApplication = applicationService.updateApplicationStatus(id, status);

            // Return the updated application with a 200 OK status
            return ResponseEntity.ok(updatedApplication);
        } catch (Exception e) {
            // Handle any exceptions and return an internal server error
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(null);  // Return null in case of error, the error message can be handled globally
        }
    }


    // Soft delete application (update status to DELETED)
    @DeleteMapping(path = "/applications/{id}")
    public ResponseEntity<?> markApplicationAsDeleted(@PathVariable int id) {
        try {
            Application deletedApplication = applicationService.deleteApplication(id);
            return ResponseEntity.ok(deletedApplication);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An error occurred while marking application as deleted: " + e.getMessage());
        }
    }

//    // Mark application as deleted
//    @PutMapping(path = "/applications/{id}/delete")
//    public ResponseEntity<?> markApplicationAsDeleted(@PathVariable int id) {
//        try {
//            Application deletedApplication = applicationService.markApplicationAsDeleted(id);
//            return ResponseEntity.ok(deletedApplication);
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
//                    .body("An error occurred while marking application as deleted: " + e.getMessage());
//        }
//    }

//    // Delete application
//    @DeleteMapping(path = "/applications/{id}")
//    public ResponseEntity<String> deleteApplication(@PathVariable int id) {
//        try {
//            applicationService.deleteApplication(id);
//            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
//                    .body("An error occurred while deleting application: " + e.getMessage());
//        }
//    }

}
