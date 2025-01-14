package com.admin.admin_service.controll;
import com.admin.admin_service.data.Admin;
import com.admin.admin_service.service.AdminService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminController {
    @Autowired
    private AdminService adminService;

    // Admin Login
    @PostMapping("/login")
    public String adminLogin(@RequestBody Admin admin) {
        boolean loginSuccess = adminService.adminLogin(admin.getUsername(), admin.getPassword());
        return loginSuccess ? "Login successful" : "Invalid credentials";
    }

    // Create a new admin
    @PostMapping("/create")
    public Admin createAdmin(@RequestBody Admin newAdmin) {
        return adminService.createAdmin(newAdmin);
    }

    // Get all users
    @GetMapping("/users")
    public List<Object> getAllUsers() {
        return adminService.getAllUsers();
    }

    // Update user status
    @PutMapping("/users/{id}/status")
    public String updateUserStatus(@PathVariable Long id, @RequestParam String status) {
        adminService.updateUserStatus(id, status);
        return "User status updated successfully.";
    }

    // Get all companies
    @GetMapping("/companies")
    public List<Object> getAllCompanies() {
        return adminService.getAllCompanies();
    }

    // Update company status
    @PutMapping("/companies/{id}/status")
    public String updateCompanyStatus(@PathVariable Long id, @RequestParam String status) {
        adminService.updateCompanyStatus(id, status);
        return "Company status updated successfully.";
    }

    // Get all jobs
    @GetMapping("/jobs")
    public List<Object> getAllJobs() {
        return adminService.getAllJobs();
    }

    // Update job status
    @PutMapping("/jobs/{id}/status")
    public String updateJobStatus(@PathVariable Long id, @RequestParam String status) {
        adminService.updateJobStatus(id, status);
        return "Job status updated successfully.";
    }

    // View system logs
    @GetMapping("/logs")
    public List<String> viewSystemLogs() {
        return adminService.getSystemLogs();
    }

    // Generate reports
    @GetMapping("/reports")
    public String generateReports() {
        return adminService.generateReports();
    }
}


