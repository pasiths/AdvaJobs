package com.application.application_service.data;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ApplicationRepository extends JpaRepository<Application, Integer> {

    List<Application> findByUserId(int userId);

    List<Application> findByJobId(int jobId);

    List<Application> findByCompanyId(int companyId);
}