package com.example.company_service.controller;

import com.example.company_service.data.Company;
import com.example.company_service.service.CompanyService;
import org.springframework.beans.factory.annotation.Autowired;
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

    @GetMapping(path = "/companies", params = {"name","status"})
    public List<Company> getCompanyByNameAndStatus(@RequestParam String name, @RequestParam int status) {
        return obj.getCompanyByNameAndStatus(name,status);
    }

    // New endpoint for creating a student
    @PostMapping(path = "/companies")
    public Company createCompany(@RequestBody Company company) {
        return obj.createCompany(company);
    }

    @PutMapping (path = "/companies")
    public Company updateCompany(@RequestBody Company company){
        return obj.updateCompany(company);
    }

    @DeleteMapping(path = "/companies/{id}")
    public void deleteCompany(@PathVariable int id){
        obj.deleteCompany(id);
    }

//    @GetMapping(path = "/test")
//    public String testEndpoint() {
//        return "Hello, World!";
//    }
//
//    @GetMapping(path = "/hello")
//    public String helloEndpoint() {
//        return "Hello from /hello!";
//    }


}
