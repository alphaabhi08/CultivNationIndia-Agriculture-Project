package com.abhi.LoginSignUp.features.admin;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdminBody {

    private String email;
    private String password;
}
