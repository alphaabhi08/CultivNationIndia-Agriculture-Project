package com.abhi.LoginSignUp.features.authentication.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AuthRequestBody {
    @Email
    @NotBlank(message = "Email is mandatory")
    private String email;
    @NotBlank(message = "Password is mandatory")
    private String password;
    private String firstName;
    private String lastName;
    private String state;
    private String town;
    private String village;
    private String mobile;
    private String soilType;

    private String roles;
}
