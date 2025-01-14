package com.example.company_service.controller;

import com.example.company_service.data.Company;
import com.example.company_service.service.CompanyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class CompanyController {

    @Autowired
    private CompanyService obj;

    @GetMapping(path = "/companies")
    public List<Company> getCompanies(){
        return obj.getCompanies();
    }

    @GetMapping(path = "/companies/{id}")
    public Company getCompanyById(@PathVariable int id){
        return obj.getCompanyById(id);
    }

    @GetMapping(path = "/companies", params = "name")
    public List<Company> getCompanyByName(@RequestParam String name) {
        return obj.getCompanyByName(name);
    }

    @GetMapping(path = "/companies", params = "industry")
    public ResponseEntity<?> getCompaniesByIndustry(@RequestParam String industry) {
        try {
            List<Company> companies = obj.getCompaniesByIndustry(industry);

            if (companies.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("No companies found in the industry: " + industry);
            }

            return ResponseEntity.ok(companies);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An error occurred while fetching companies: " + e.getMessage());
        }
    }


    // New endpoint for creating a company
    @PostMapping(path = "/companies")
    public Company createCompany(@RequestBody Company company) {
        return obj.createCompany(company);
    }

//    @PutMapping (path = "/companies/{id}")
//    public Company updateCompany(@PathVariable int id,@RequestBody Company company){
//        return obj.updateCompany(id,company);
//    }

    // Update company endpoint
    @PutMapping("/companies/{id}")
    public ResponseEntity<Company> updateCompany(@PathVariable int id, @RequestBody Company company) {
        Company updatedCompany = obj.updateCompany(id, company);
        return ResponseEntity.ok(updatedCompany);
    }

    @DeleteMapping(path = "/companies/{id}")
    public void deleteCompany(@PathVariable int id){
        obj.deleteCompany(id);
    }


}
