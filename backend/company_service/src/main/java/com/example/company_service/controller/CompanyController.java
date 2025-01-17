package com.example.company_service.controller;

import com.example.company_service.data.Company;
import com.example.company_service.dto.LoginRequestDto;
import com.example.company_service.service.CompanyService;
import com.example.company_service.utils.TokenUtil;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
// @CrossOrigin(origins = "http://localhost:3000")
public class CompanyController {

    @Autowired
    private CompanyService obj;

    @GetMapping(path = "/companies")
    public List<Company> getCompanies() {
        return obj.getCompanies();
    }

    @GetMapping(path = "/companies/{id}")
    public Company getCompanyById(@PathVariable int id) {
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

    @GetMapping(path = "/companies", params = "startsWith")
    public ResponseEntity<?> getCompaniesByStartingLetter(@RequestParam String startsWith) {
        try {
            List<Company> companies = obj.getCompaniesByStartingLetter(startsWith);

            if (companies.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("No companies found starting with: " + startsWith);
            }

            return ResponseEntity.ok(companies);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An error occurred while fetching companies: " + e.getMessage());
        }
    }

    @GetMapping(path = "/companies", params = "industryStartsWith")
    public ResponseEntity<?> getCompaniesByIndustryStartingLetter(@RequestParam String industryStartsWith) {
        try {
            List<Company> companies = obj.getCompaniesByIndustryStartingLetter(industryStartsWith);

            if (companies.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("No companies found with industry starting with: " + industryStartsWith);
            }

            return ResponseEntity.ok(companies);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An error occurred while fetching companies: " + e.getMessage());
        }
    }

    // New endpoint for creating a company
    @PostMapping(path = "/companies")
    public ResponseEntity<Company> createCompany(@RequestBody Company company, HttpServletResponse response) {
        Company comp = obj.createCompany(company);

        String token = TokenUtil.generateToken(comp.getId(), comp.getIsVerified().toString(), "company");

        ResponseCookie cookie = ResponseCookie.from("auth_token", token).httpOnly(false).secure(true).path("/")
                .maxAge(3600) // 1 hour
                .build();

        response.setHeader("Set-Cookie", cookie.toString());

        return ResponseEntity.ok(comp);
    }

    // @PutMapping (path = "/companies/{id}")
    // public Company updateCompany(@PathVariable int id,@RequestBody Company
    // company){
    // return obj.updateCompany(id,company);
    // }

    // Update company endpoint
    @PutMapping("/companies/{id}")
    public ResponseEntity<Company> updateCompany(@PathVariable int id, @RequestBody Company company) {
        Company updatedCompany = obj.updateCompany(id, company);
        return ResponseEntity.ok(updatedCompany);
    }

    @DeleteMapping(path = "/companies/{id}")
    public void deleteCompany(@PathVariable int id) {
        obj.deleteCompany(id);
    }

    @PostMapping("/companies/login")
    public ResponseEntity<Company> login(@RequestBody LoginRequestDto loginRequest, HttpServletResponse response) {
        Company company = obj.login(loginRequest);

        String token = TokenUtil.generateToken(company.getId(), company.getIsVerified().toString(), "company");

        ResponseCookie cookie = ResponseCookie.from("auth_token", token).httpOnly(false).secure(true).path("/")
                .maxAge(3600) // 1 hour
                .build();

        response.setHeader("Set-Cookie", cookie.toString());

        return ResponseEntity.ok(company);
    }

}
