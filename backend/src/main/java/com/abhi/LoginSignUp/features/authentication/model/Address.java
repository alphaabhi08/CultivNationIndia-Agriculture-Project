package com.abhi.LoginSignUp.features.authentication.model;



import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Address {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fullName;
    private String street;
    private String city;
    private String state;

    @Column(length = 6)
    private String zipCode;  // Only numeric input expected (validate on frontend)

    @Column(length = 10)
    private String mobileNumber; // Only numeric input expected (validate on frontend)

    private String country;

    @ManyToOne
    private AuthUser user;
}

