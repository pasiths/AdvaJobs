package com.application.application_service.service;

import com.application.application_service.data.Application;
import com.application.application_service.data.ApplicationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Objects;

@Service
public class ApplicationService {

    @Autowired
    private ApplicationRepository applicationRepository;

    private RestTemplate restTemplate;

    @Autowired
    public ApplicationService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public ApplicationService(ApplicationRepository applicationRepository, RestTemplate restTemplate) {
        this.applicationRepository = applicationRepository;
        this.restTemplate = restTemplate;
    }

    // Create a new application
    public Application createApplication(Application application) throws IOException {
        String userMsUrl = "http://localhost:8081/user/cv/" + application.getUserId();
        ResponseEntity<byte[]> response = restTemplate.getForEntity(userMsUrl, byte[].class);
        Application app = new Application();
        if (response.getStatusCode() == HttpStatus.OK) {
            String uploadDir = "application-uploads/";
            File directory = new File(uploadDir);
            if (!directory.exists()) directory.mkdirs();

            Path filePath = Paths.get(uploadDir + application.getUserId() + "_cv.pdf");
            Files.write(filePath, Objects.requireNonNull(response.getBody()));

//            app.setCompanyId(application.getCompanyId());
//            app.setCvPath(filePath.toString());
            application.setCvPath(filePath.toString());
//            app.setDateApplied(app.getCreatedAt());
//            app.setEmail(application.getEmail());
//            app.setJobId(application.getJobId());
//            app.setJobTitle(application.getJobTitle());
//            app.setMessage(application.getMessage());
//            app.setName(application.getName());
//            app.setTelephoneNo(application.getTelephoneNo());
//            app.setUserId(application.getUserId());
//
//            applicationRepository.save(app);
            applicationRepository.save(application);
        }
        return application;
    }

//    // Get all applications
//    public List<Application> getApplications() {
//        return applicationRepository.findAll();
//    }
//
//    // Get application by ID
//    public Application getApplicationById(int id) {
//        return applicationRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Application with ID " + id + " not found"));
//    }
//
//    // Get applications by status
//    public List<Application> getApplicationsByStatus(String status) {
//        return applicationRepository.findByStatus(status);
//    }
//
//    // Get applications by user ID
//    public List<Application> getApplicationsByUser(int userId) {
//        return applicationRepository.findByUserId(userId);
//    }
//
//    // Get applications by company ID
//    public List<Application> getApplicationsByCompany(int companyId) {
//        return applicationRepository.findApplicationsByCompanyId(companyId);
//    }
//
//    // Get applications by job ID
//    public List<Application> getApplicationsByJobId(int jobId) {
//        return applicationRepository.findApplicationsByJobId(jobId);
//    }
//
//    public List<Application> getApplicationsByEmail(String email) {
//        return applicationRepository.findByEmail(email);
//    }
//
//    public List<Application> getApplicationsByName(String name) {
//        return applicationRepository.findByName(name);
//    }
//
//    public List<Application> getApplicationsByCompanyName(String companyName) {
//        return applicationRepository.findByCompanyName(companyName);
//    }
//
//    public List<Application> getApplicationsByJobTitle(String jobTitle) {
//        return applicationRepository.findByJobTitle(jobTitle);
//    }


//    // Soft delete application (mark as DELETED)
//    public Application deleteApplication(int id) {
//        Application application = applicationRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Application with ID " + id + " not found"));
////        application.setStatus("DELETED");
//        return applicationRepository.save(application);
//    }
}
