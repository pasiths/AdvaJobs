package com.example.company_service.controller;

import com.example.company_service.data.Company;
import com.example.company_service.dto.LoginRequestDto;
import com.example.company_service.service.CompanyService;
import org.springframework.beans.factory.annotation.Autowired;
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

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequestDto loginRequest) {
        String token = obj.login(loginRequest.getEmail(), loginRequest.getPassword());
        return ResponseEntity.ok(token);
    }


}
