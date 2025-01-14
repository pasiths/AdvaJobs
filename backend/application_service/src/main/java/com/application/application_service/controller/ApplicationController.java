package com.application.application_service.controller;

import com.application.application_service.data.Application;
import com.application.application_service.service.ApplicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
public class ApplicationController {

    @Autowired
    private ApplicationService applicationService;

    @PostMapping(path="/applications")
    public ResponseEntity<Application> createApplication(@Valid @RequestBody Application application) {
        return ResponseEntity.ok(applicationService.createApplication(application));
    }

    @GetMapping("/applications/users/{userId}")
    public ResponseEntity<List<Application>> getApplicationsByUser(@PathVariable int userId) {
        return ResponseEntity.ok(applicationService.getApplicationsByUser(userId));
    }

    @GetMapping("/applications/jobs/{jobId}")
    public ResponseEntity<List<Application>> getApplicationsByJob(@PathVariable int jobId) {
        return ResponseEntity.ok(applicationService.getApplicationsByJob(jobId));
    }

    @GetMapping("/applications/companies/{companyId}")
    public ResponseEntity<List<Application>> getApplicationsByCompany(@PathVariable int companyId) {
        return ResponseEntity.ok(applicationService.getApplicationsByCompany(companyId));
    }

    @PatchMapping("/applications/{id}/status")
    public ResponseEntity<Application> updateApplicationStatus(@PathVariable int id, @RequestParam String status) {
        Optional<Application> updatedApplication = applicationService.updateApplicationStatus(id, status);
        return updatedApplication.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }
}
