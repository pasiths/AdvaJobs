package com.admin.admin_service.service;

import com.admin.admin_service.data.Admin;
import com.admin.admin_service.data.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;


import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
public class AdminService {

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // Admin Login
    public boolean adminLogin(String username, String password) {
        Admin admin = adminRepository.findByUsername(username);
        if (admin != null && passwordEncoder.matches(password, admin.getPassword())) {
            return true;
        }
        return false;
    }

    // Create Admin
    public Admin createAdmin(Admin newAdmin) {
        newAdmin.setPassword(passwordEncoder.encode(newAdmin.getPassword()));
        return adminRepository.save(newAdmin);
    }

    // Get All Users
    public List<Object> getAllUsers() {
        String userServiceUrl = "http://user-service/api/users";
        Object[] users = restTemplate.getForObject(userServiceUrl, Object[].class);
        return users != null ? Arrays.asList(users) : new ArrayList<>();
    }

    // Update User Status
    public void updateUserStatus(Long userId, String status) {
        String userServiceUrl = "http://user-service/api/users/" + userId + "/status?status=" + status;
        restTemplate.put(userServiceUrl, null);
    }

    // Get All Companies
    public List<Object> getAllCompanies() {
        String companyServiceUrl = "http://company-service/api/companies";
        Object[] companies = restTemplate.getForObject(companyServiceUrl, Object[].class);
        return companies != null ? Arrays.asList(companies) : new ArrayList<>();
    }

    // Update Company Status
    public void updateCompanyStatus(Long companyId, String status) {
        String companyServiceUrl = "http://company-service/api/companies/" + companyId + "/status?status=" + status;
        restTemplate.put(companyServiceUrl, null);
    }

    // Get All Jobs
    public List<Object> getAllJobs() {
        String jobServiceUrl = "http://job-service/api/jobs";
        Object[] jobs = restTemplate.getForObject(jobServiceUrl, Object[].class);
        return jobs != null ? Arrays.asList(jobs) : new ArrayList<>();
    }

    // Update Job Status
    public void updateJobStatus(Long jobId, String status) {
        String jobServiceUrl = "http://job-service/api/jobs/" + jobId + "/status?status=" + status;
        restTemplate.put(jobServiceUrl, null);
    }

    // Get System Logs
    public List<String> getSystemLogs() {
        // Placeholder logic
        return List.of("Log 1: Admin logged in", "Log 2: User status updated");
    }

    // Generate Reports
    public String generateReports() {
        // Placeholder logic
        return "Report generation is not implemented yet.";
    }

}
