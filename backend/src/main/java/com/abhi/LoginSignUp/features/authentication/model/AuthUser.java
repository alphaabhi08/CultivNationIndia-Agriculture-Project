package com.abhi.LoginSignUp.features.authentication.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "users")
@Builder
public class AuthUser {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Email
    @NotNull
    @Column(unique = true)
    private String email;

    private String firstName;
    private String lastName;
    private String state;
    private String town;
    private String village;
    private String mobile;
    private String soilType;


    private Boolean emailVerified = false;
    private String emailVerificationToken = null;
    private LocalDateTime emailVerificationTokenExpiryDate = null;


    @JsonIgnore
    private String password;
    private String passwordResetToken = null;
    private LocalDateTime passwordResetTokenExpiryDate = null;

    public enum Role {
        USER,
        ADMIN,
        AGROAGENCY;
    }

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role roles;

    public AuthUser(String email, String password, Role roles) {
        this.email = email;
        this.password = password;
        this.roles = roles;
    }
}