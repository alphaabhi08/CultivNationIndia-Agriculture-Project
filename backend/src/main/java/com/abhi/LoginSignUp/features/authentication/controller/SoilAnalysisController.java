package com.abhi.LoginSignUp.features.authentication.controller;

import com.abhi.LoginSignUp.features.authentication.dto.SoilAnalysisBody;
import com.abhi.LoginSignUp.features.authentication.model.AuthUser;
import com.abhi.LoginSignUp.features.authentication.model.SoilAnalysisRequest;
import com.abhi.LoginSignUp.features.authentication.repository.UserRepo;
import com.abhi.LoginSignUp.features.authentication.service.SoilAnalysisService;
import com.abhi.LoginSignUp.features.authentication.utils.JsonWebToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/soil-analysis")
public class SoilAnalysisController {

    @Autowired
    private SoilAnalysisService soilAnalysisService;

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private JsonWebToken jwtUtil;

    /**
     * ✅ Submit Soil Analysis Request
     */
    @PostMapping("/submit")
    public ResponseEntity<?> submitSoilAnalysis(
            @RequestBody SoilAnalysisBody body,
            @RequestHeader("Authorization") String token) {

        // ✅ Extract email from JWT token
        String jwtToken = token.substring(7); // Remove "Bearer "
        String userEmail = jwtUtil.getEmailFromToken(jwtToken);

        AuthUser user = userRepo.findByEmail(userEmail).orElse(null);

        if (user == null) {
            return ResponseEntity.status(404).body("User not found");
        }

        SoilAnalysisRequest savedRequest = soilAnalysisService.submitSoilAnalysis(body, user);
        return ResponseEntity.ok(savedRequest);
    }

    /**
     * ✅ Get All Soil Analysis Requests
     */
    @GetMapping("/all")
    public ResponseEntity<List<SoilAnalysisRequest>> getAllSoilAnalysisRequests() {
        List<SoilAnalysisRequest> requests = soilAnalysisService.getAllSoilAnalysisRequests();
        return ResponseEntity.ok(requests);
    }

    /**
     * ✅ Get Soil Analysis Request by ID
     */
    @GetMapping("/{id}")
    public ResponseEntity<?> getSoilAnalysisById(@PathVariable Long id) {
        Optional<SoilAnalysisRequest> request = soilAnalysisService.getSoilAnalysisById(id);

        if (request.isPresent()) {
            return ResponseEntity.ok(request.get());
        } else {
            return ResponseEntity.status(404).body("Soil Analysis Request not found");
        }
    }


}
