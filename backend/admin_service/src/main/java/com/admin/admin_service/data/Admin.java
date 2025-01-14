package com.admin.admin_service.data;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "admins")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Admin {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        @Column(name="username", nullable = false, unique = true)
        private String username;

        @Column(name="password", nullable = false)
        private String password;

        private String role = "ADMIN";

}
