package com.application.application_service.data;

import com.application.application_service.data.Application;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

@Repository
public interface ApplicationRepository extends JpaRepository<Application, Integer> {

    // Custom query to find applications by status
    @Query("SELECT a FROM Application a WHERE a.status = :status")
    List<Application> findByStatus(@Param("status") String status);

    // Custom query to find applications by user ID
    @Query("SELECT a FROM Application a WHERE a.userId = :userId")
    List<Application> findByUserId(@Param("userId") int userId);

    // Find applications by company ID using a custom query
    @Query("SELECT a FROM Application a WHERE a.companyId = :companyId")
    List<Application> findApplicationsByCompanyId(@Param("companyId") int companyId);

    // Custom query to get applications by jobId
    @Query("SELECT a FROM Application a WHERE a.jobId = :jobId")
    List<Application> findApplicationsByJobId(@Param("jobId") int jobId);

    // Find applications by email
    @Query("SELECT a FROM Application a WHERE a.email = :email")
    List<Application> findByEmail(@Param("email") String email);

    // Find applications by applicant name
    @Query("SELECT a FROM Application a WHERE a.name = :name")
    List<Application> findByName(@Param("name") String name);

    // Find applications by company name
    @Query("SELECT a FROM Application a WHERE a.companyName = :companyName")
    List<Application> findByCompanyName(@Param("companyName") String companyName);

    // Find applications by job title
    @Query("SELECT a FROM Application a WHERE a.jobTitle = :jobTitle")
    List<Application> findByJobTitle(@Param("jobTitle") String jobTitle);
}
