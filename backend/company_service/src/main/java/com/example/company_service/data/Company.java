package com.example.company_service.data;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "company") // Replace with your actual table name
public class Company {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "name", nullable = false, length = 255)
    private String name;

    @Column(name = "email", nullable = false, unique = true, length = 255)
    private String email;

    @Column(name = "location", length = 255)
    private String location;

    @Column(name = "phone_num", length = 255)
    private String phoneNum;

    @Column(name = "industry", length = 255)
    private String industry;

    @Column(name = "logo", length = 255)
    private String logo;

    @Column(name = "logo_type", length = 255)
    private String logoType;

    @Column(name = "password", nullable = false, length = 255)
    private String password;

    @Column(name = "isVerified", length = 255)
    private String isVerified;

    @Column(name = "date")
    private LocalDateTime date;

    @Column(name = "status")
    private int status;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getPhoneNum() {
        return phoneNum;
    }

    public void setPhoneNum(String phoneNum) {
        this.phoneNum = phoneNum;
    }

    public String getIndustry() {
        return industry;
    }

    public void setIndustry(String industry) {
        this.industry = industry;
    }

    public String getLogo() {
        return logo;
    }

    public void setLogo(String logo) {
        this.logo = logo;
    }

    public String getLogoType() {
        return logoType;
    }

    public void setLogoType(String logoType) {
        this.logoType = logoType;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getIsVerified() {
        return isVerified;
    }

    public void setIsVerified(String isVerified) {
        this.isVerified = isVerified;
    }

    public LocalDateTime getDate() {
        return date;
    }

    public void setDate(LocalDateTime date) {
        this.date = date;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }
}
