package com.application.application_service.service;

import com.application.application_service.data.Application;
import com.application.application_service.data.ApplicationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ApplicationService {

    @Autowired
    private ApplicationRepository applicationRepository;

    public Application createApplication(Application application) {
        application.setDateApplied(LocalDateTime.now());
        application.setCreatedAt(LocalDateTime.now());
        return applicationRepository.save(application);
    }

    public List<Application> getApplicationsByUser(int userId) {
        return applicationRepository.findByUserId(userId);
    }

    public List<Application> getApplicationsByJob(int jobId) {
        return applicationRepository.findByJobId(jobId);
    }

    public List<Application> getApplicationsByCompany(int companyId) {
        return applicationRepository.findByCompanyId(companyId);
    }

    public Optional<Application> updateApplicationStatus(int id, String status) {
        Optional<Application> application = applicationRepository.findById(id);
        application.ifPresent(app -> {
            app.setStatus(status);
            app.setUpdatedAt(LocalDateTime.now());
            applicationRepository.save(app);
        });
        return application;
    }
}
