package com.abhi.LoginSignUp.features.authentication.controller;
import com.abhi.LoginSignUp.features.authentication.model.SoilAnalysisRequest;
import com.abhi.LoginSignUp.features.authentication.repository.SoilAnalysisRepository;
import com.abhi.LoginSignUp.features.authentication.dto.SoilAnalysisBody;
import com.abhi.LoginSignUp.features.authentication.model.AuthUser;
import com.abhi.LoginSignUp.features.authentication.repository.UserRepo;
import com.abhi.LoginSignUp.features.authentication.utils.JsonWebToken;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping("/api/soil-analysis")
public class SoilAnalysisController {

    @Autowired
    private SoilAnalysisRepository soilAnalysisRepository;

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private JsonWebToken jsonWebToken;

    @PostMapping("/submit")
    public ResponseEntity<?> submitSoilAnalysis(@RequestBody SoilAnalysisBody body,
                                                HttpServletRequest request
                                                ){

        try {
            String authHeader = request.getHeader("Authorization");
            if(authHeader == null || !authHeader.startsWith("Bearer ")) {
                return ResponseEntity.status(401).body("Authorization token missing");
            }

            String token = authHeader.substring(7);
            String email = jsonWebToken.getEmailFromToken(token);

            AuthUser user = userRepo.findByEmail(email).orElseThrow(() -> new IllegalArgumentException("User not found"));

            SoilAnalysisRequest analysis = new SoilAnalysisRequest();
            analysis.setUser(user);
            analysis.setLocation(body.getLocation());
            analysis.setDepth(body.getDepth());
            analysis.setSoilType(body.getSoilType());
            analysis.setOrganicMatter(body.getOrganicMatter());
            analysis.setSoilTexture(body.getSoilTexture());
            analysis.setCropType(body.getCropType());
            analysis.setPreviousCrop(body.getPreviousCrop());
            analysis.setFertilizerUsed(body.getFertilizerUsed());
            analysis.setIrrigation(body.getIrrigation());
            analysis.setSoilDescription(body.getSoilDescription());

            SoilAnalysisRequest savedAnalysis = soilAnalysisRepository.save(analysis);

            return ResponseEntity.ok(savedAnalysis);
        } catch (Exception e){
            return ResponseEntity.status(500).body("Error submitting soil analysis: " + e.getMessage());
        }

    }

}
