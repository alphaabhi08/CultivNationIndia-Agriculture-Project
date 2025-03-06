package com.abhi.LoginSignUp.features.authentication.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class SoilAnalysisRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private AuthUser user;
    private String location;
    private Double depth;


    private String soilType;

    private Double organicMatter;
    private String soilTexture;

    private String cropType;
    private String previousCrop;
    private String fertilizerUsed;
    private String irrigation;

    @Column(length = 1000)
    private String soilDescription;

    private LocalDateTime createdAt = LocalDateTime.now();

}
