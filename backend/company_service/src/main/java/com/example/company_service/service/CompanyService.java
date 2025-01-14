package com.example.company_service.service;

import com.example.company_service.data.Company;
import com.example.company_service.data.CompanyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class CompanyService {

    @Autowired
    private CompanyRepository cmpRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    private void ensureActiveStatus(Company company) {
        if (company.getStatus() != 1) {
            throw new RuntimeException("Operation not allowed. The company is not active.");
        }
    }


//    public List<Company> getCompanies(){
//        return cmpRepo.findAll();
//    }

    public List<Company> getCompanies() {
        return cmpRepo.findAll().stream()
                .filter(company -> company.getStatus() == 1) // Only active companies
                .toList();
    }


//    public Company getCompanyById(int id){
//        Optional<Company> company = cmpRepo.findById(id);
//
//        if(company.isPresent()){
//            return company.get();
//        }
//        return null;
//    }

    public Company getCompanyById(int id) {
        Company company = cmpRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Company with ID " + id + " not found"));
        ensureActiveStatus(company); // Check if the company is active
        return company;
    }


//    public List<Company> getCompanyByName(String name)
//    {
//        return cmpRepo.getCompanyByName(name);
//    }

    public List<Company> getCompanyByName(String name) {
        return cmpRepo.getCompanyByName(name).stream()
                .filter(company -> company.getStatus() == 1) // Only active companies
                .toList();
    }


//    public Company createCompany(Company company) {
//        // Create a new Company object
//        Company com = new Company();
//
//        // Set the incoming values from the parameter object
//        com.setName(company.getName());
//        com.setEmail(company.getEmail());
//        com.setPhoneNum(company.getPhoneNum());
//        com.setLocation(company.getLocation());
//        com.setIndustry(company.getIndustry());
//
//        // Set default values
//        com.setLogo("null");
//        // Hash the password before saving (uncomment if a password field exists)
//        com.setPassword(passwordEncoder.encode(company.getPassword()));
//        //com.setPassword(company.getPassword());
//
//        com.setIsVerified("false");
//        com.setDate(LocalDateTime.now());
//        com.setStatus(1);
//
//        // Save the new company entity to the database
//        return cmpRepo.save(com);
//    }

    public Company createCompany(Company company) {
        // Check if a company with the same name, email, or phone number already exists
        if (cmpRepo.existsByName(company.getName())) {
            throw new RuntimeException("A company with the name '" + company.getName() + "' already exists.");
        }
        if (cmpRepo.existsByEmail(company.getEmail())) {
            throw new RuntimeException("A company with the email '" + company.getEmail() + "' already exists.");
        }
        if (cmpRepo.existsByPhoneNum(company.getPhoneNum())) {
            throw new RuntimeException("A company with the phone number '" + company.getPhoneNum() + "' already exists.");
        }

        // Create a new Company object and set its fields
        Company com = new Company();
        com.setName(company.getName());
        com.setEmail(company.getEmail());
        com.setPhoneNum(company.getPhoneNum());
        com.setLocation(company.getLocation());
        com.setIndustry(company.getIndustry());
        com.setLogo("null");
        com.setPassword(passwordEncoder.encode(company.getPassword()));
        com.setIsVerified("false");
        com.setDate(LocalDateTime.now());
        com.setStatus(1);

        // Save the new company entity to the database
        return cmpRepo.save(com);
    }



    public Company updateCompany(int id, Company company) {
//        // Fetch the existing company from the database using the ID
//        Company existingCompany = cmpRepo.findById(id)
//                .orElseThrow(() -> new RuntimeException("Company with ID " + id + " not found"));

        Company existingCompany = cmpRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Company with ID " + id + " not found"));
        ensureActiveStatus(existingCompany); // Check if the company is active

        // Update only fields provided in the input
        if (company.getName() != null && !company.getName().isEmpty()) {
            existingCompany.setName(company.getName());
        }
        if (company.getPhoneNum() != null && !company.getPhoneNum().isEmpty()) {
            existingCompany.setPhoneNum(company.getPhoneNum());
        }
        if (company.getLocation() != null && !company.getLocation().isEmpty()) {
            existingCompany.setLocation(company.getLocation());
        }
        if (company.getIndustry() != null && !company.getIndustry().isEmpty()) {
            existingCompany.setIndustry(company.getIndustry());
        }

        // Preserve email unless explicitly updated
        if (company.getEmail() != null && !company.getEmail().isEmpty()) {
            existingCompany.setEmail(company.getEmail());
        }

        // Preserve the password if not provided in the update request
        if (company.getPassword() != null && !company.getPassword().isEmpty()) {
            existingCompany.setPassword(passwordEncoder.encode(company.getPassword()));
        }

        // Handle other default or derived fields
        existingCompany.setLogo("null");
        existingCompany.setIsVerified("false");
        existingCompany.setDate(LocalDateTime.now());
        existingCompany.setStatus(1);

        // Save and return the updated entity
        return cmpRepo.save(existingCompany);
    }

//    //Method to delete a company by ID
//    public void deleteCompany(int id){
//        Optional<Company> company=cmpRepo.findById(id);
//        if(company.isPresent()) {
//            cmpRepo.deleteById(id);
//        }
//    }
    public void deleteCompany(int id) {
        Company company = cmpRepo.findById(id)
            .orElseThrow(() -> new RuntimeException("Company with ID " + id + " not found"));
        ensureActiveStatus(company); // Check if the company is active
        cmpRepo.deleteById(id);
    }


}
