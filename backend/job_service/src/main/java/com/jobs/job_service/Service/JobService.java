package com.jobs.job_service.Service;

import com.jobs.job_service.Data.JobRepository;
import com.jobs.job_service.Data.Jobs;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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

    // Retrieve all jobs
    public List<Jobs> getAllJobs() {
        return jobRepo.findAll();
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

            return jobRepo.save(existingJob);
        } else {
            throw new RuntimeException("Job not found with id: " + id);
        }
    }

    // Delete a job by ID
    public void deleteJob(int id) {
        if (jobRepo.existsById(id)) {
            jobRepo.deleteById(id);
        } else {
            throw new RuntimeException("Job not found with id: " + id);
        }
    }
}
