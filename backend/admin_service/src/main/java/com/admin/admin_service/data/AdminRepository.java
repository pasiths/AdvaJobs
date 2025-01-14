package com.admin.admin_service.data;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdminRepository extends JpaRepository<Admin,Integer> {

    Admin findByUsername(String username);

}
