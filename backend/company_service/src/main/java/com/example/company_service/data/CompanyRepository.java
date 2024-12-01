package com.example.company_service.data;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CompanyRepository extends JpaRepository<Company, Integer> {

    @Query("select c from Company c where c.name=?1")
    public List<Company> getCompanyByName(String name );

    @Query("select c from Company c where c.name=?1 and c.status=?2")
    public List<Company> getCompanyByNameAndStatus(String name, int status);
}
