package com.abhi.LoginSignUp.configuration;

import com.abhi.LoginSignUp.features.authentication.model.AuthUser;
import com.abhi.LoginSignUp.features.authentication.repository.UserRepo;
import com.abhi.LoginSignUp.features.authentication.utils.Encoder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DatabaseConfig {

    @Autowired
    private Encoder encoder;

    @Bean
    public CommandLineRunner commandLineRunner(UserRepo repo) {
        return args -> {

        if (!repo.existsByEmail("123@gmail.com")) {
            AuthUser user = AuthUser.builder().email("123@gmail.com").password(encoder.encode("12345678")).roles(AuthUser.Role.USER).build();
            repo.save(user);
            System.out.println("Initial user created");
        } else
            System.out.println("User already exists");


        };
    }
}


