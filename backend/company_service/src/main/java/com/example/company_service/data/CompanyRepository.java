package com.example.company_service.data;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CompanyRepository extends JpaRepository<Company, Integer> {

    @Query("select c from Company c where c.name=?1")
    public List<Company> getCompanyByName(String name );

    @Query("select c from Company c where c.name=?1 and c.status=?2")
    public List<Company> getCompanyByNameAndStatus(String name, int status);

    @Query("SELECT c FROM Company c WHERE c.industry = :industry AND c.status = 1")
    List<Company> findCompaniesByIndustry(@Param("industry") String industry);

    @Query("SELECT c FROM Company c WHERE LOWER(c.name) LIKE :startsWith AND c.status = 1")
    List<Company> findCompaniesByStartingLetter(@Param("startsWith") String startsWith);

    @Query("SELECT c FROM Company c WHERE LOWER(c.industry) LIKE :industryStartsWith AND c.status = 1")
    List<Company> findCompaniesByIndustryStartingLetter(@Param("industryStartsWith") String industryStartsWith);


    boolean existsByEmail(String email);

    boolean existsByName(String name);

    boolean existsByPhoneNum(String phoneNum);
}
