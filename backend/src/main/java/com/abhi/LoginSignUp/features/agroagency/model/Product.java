package com.abhi.LoginSignUp.features.agroagency.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String prodName;

    private String prodTypes;

    private String imageName;
    private String imageType;
    @Lob
    private byte[] imageData;

    private String currMarketPrice;
    private String bestPrice;

    @Column(length = 1000)
    private String description;



}
