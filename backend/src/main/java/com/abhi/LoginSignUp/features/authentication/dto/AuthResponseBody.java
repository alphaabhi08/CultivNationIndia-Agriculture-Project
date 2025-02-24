package com.abhi.LoginSignUp.features.authentication.dto;

import lombok.AllArgsConstructor;
import lombok.Data;


@AllArgsConstructor
@Data
public class AuthResponseBody {

    private final String token;
    private final String message;

}
