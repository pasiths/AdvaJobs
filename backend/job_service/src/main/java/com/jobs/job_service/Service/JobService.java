package com.jobs.job_service.Service;

import com.jobs.job_service.Data.JobRepository;
import com.jobs.job_service.Data.Jobs;
import com.jobs.job_service.Data.Status;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class JobService {

    @Autowired
    private JobRepository jobRepo;

    // Non-static method for API testing
    public String apiTest() {
        return "API is working!";
    }

    // Create a new job
    public Jobs createJob(Jobs job) {
        if (job == null) {
            throw new IllegalArgumentException("Job object cannot be null");
        }

        // Save the job object
        return jobRepo.save(job);
    }

    // Retrieve a job by ID
    public Optional<Jobs> getJobById(int id) {
        return jobRepo.findById(id);
    }

    // Retrieve all jobs (including active or inactive)
    public List<Jobs> getAllJobs() {
        return jobRepo.findAll();
    }

    // Retrieve only active jobs
    public List<Jobs> getActiveJobs() {
        return jobRepo.findAll().stream()
                .filter(job -> Status.Active.equals(job.getStatus()))  // Compare with Status enum
                .collect(Collectors.toList());
    }

    // Update an existing job
    public Jobs updateJob(int id, Jobs jobDetails) {
        Optional<Jobs> existingJobOpt = jobRepo.findById(id);

        if (existingJobOpt.isPresent()) {
            Jobs existingJob = existingJobOpt.get();

            // Update fields
            existingJob.setTitle(jobDetails.getTitle());
            existingJob.setLocation(jobDetails.getLocation());
            existingJob.setCloseDate(jobDetails.getCloseDate());
            existingJob.setDescription(jobDetails.getDescription());
            existingJob.setPhone(jobDetails.getPhone());
            existingJob.setEmail(jobDetails.getEmail());
            existingJob.setContent(jobDetails.getContent());
            existingJob.setStatus(jobDetails.getStatus());  // Update status if necessary

            return jobRepo.save(existingJob);
        } else {
            throw new RuntimeException("Job not found with id: " + id);
        }
    }

    // Change job status to inactive (soft delete)
    public void deleteJob(int id) {
        Optional<Jobs> existingJobOpt = jobRepo.findById(id);

        if (existingJobOpt.isPresent()) {
            Jobs existingJob = existingJobOpt.get();

            // Change job status to 'inactive'
            existingJob.setStatus(Status.Inactive);

            jobRepo.save(existingJob);
        } else {
            throw new RuntimeException("Job not found with id: " + id);
        }
    }

    // Filter jobs by criteria
    public List<Jobs> filterJobs(String jobType, String location, Double minSalary, Double maxSalary ) {
        return jobRepo.findAll().stream()
                .filter(job -> jobType == null || job.getJobType().equalsIgnoreCase(jobType))
                .filter(job -> location == null || job.getLocation().equalsIgnoreCase(location))
                .filter(job -> minSalary == null || job.getSalary() >= minSalary)
                .filter(job -> maxSalary == null || job.getSalary() <= maxSalary)
                .collect(Collectors.toList());
    }
}
