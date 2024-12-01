package com.example.company_service.service;

import com.example.company_service.data.Company;
import com.example.company_service.data.CompanyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CompanyService {

    @Autowired
    private CompanyRepository cmpRepo;

    public List<Company> getCompanies(){
        return cmpRepo.findAll();
    }

    public Company getCompanyById(int id){
        Optional<Company> company = cmpRepo.findById(id);

        if(company.isPresent()){
            return company.get();
        }
        return null;
    }

    public List<Company> getCompanyByName(String name)
    {
        return cmpRepo.getCompanyByName(name);
    }

    public List<Company> getCompanyByNameAndStatus(String name,int status)
    {
        return cmpRepo.getCompanyByNameAndStatus(name,status);
    }

    // Method to create or save a company
    public Company createCompany(Company company) {
        return cmpRepo.save(company);
    }

    // Method to update a company
    public Company updateCompany(Company company){
        return cmpRepo.save(company);
    }

    //Method to delete a company by ID
    public void deleteCompany(int id){
        Optional<Company> company=cmpRepo.findById(id);
        if(company.isPresent()) {
            cmpRepo.deleteById(id);
        }
    }
}
