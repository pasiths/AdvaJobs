package com.jobs.job_service.Controll;

import com.jobs.job_service.Data.Jobs;
import com.jobs.job_service.Service.JobService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class JobController {

    @Autowired
    private JobService jobService;

    // Test endpoint
    @GetMapping("/test")
    public String getTest() {
        return jobService.apiTest(); // Call the non-static apiTest method
    }

    // Create a new job
    @PostMapping(path = "/job")
    public Jobs createJob(@RequestBody Jobs job) {
        return jobService.createJob(job);
    }

    // Get all jobs
    @GetMapping
    public List<Jobs> getAllJobs() {
        return jobService.getAllJobs();
    }

    // Get a job by ID
    @GetMapping("/{id}")
    public Optional<Jobs> getJobById(@PathVariable int id) {
        return jobService.getJobById(id);
    }

    // Update a job by ID
    @PutMapping("/{id}")
    public Jobs updateJob(@PathVariable int id, @RequestBody Jobs jobDetails) {
        return jobService.updateJob(id, jobDetails);
    }

    // Delete a job by ID
    @DeleteMapping("/{id}")
    public String deleteJob(@PathVariable int id) {
        jobService.deleteJob(id);
        return "Job with ID " + id + " has been deleted successfully.";
    }
}
