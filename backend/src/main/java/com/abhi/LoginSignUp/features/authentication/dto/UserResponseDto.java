package com.abhi.LoginSignUp.features.authentication.dto;

import lombok.Data;

@Data
public class UserResponseDto {
    private Long id;
    private String email;
    private String firstName;
    private String lastName;
    private String roles;

}
