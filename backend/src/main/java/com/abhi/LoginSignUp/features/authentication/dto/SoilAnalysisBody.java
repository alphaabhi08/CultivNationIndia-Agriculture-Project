package com.abhi.LoginSignUp.features.authentication.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SoilAnalysisBody {

    private String email;
    private String location;
    private Double depth;
    private String soilType;
    private Double organicMatter;
    private String soilTexture;
    private String cropType;
    private String previousCrop;
    private String fertilizerUsed;
    private String irrigation;
    private String soilDescription;
}
