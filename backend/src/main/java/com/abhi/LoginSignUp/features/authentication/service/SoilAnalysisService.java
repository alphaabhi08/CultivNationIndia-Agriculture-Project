package com.abhi.LoginSignUp.features.authentication.service;

import com.abhi.LoginSignUp.features.authentication.dto.SoilAnalysisBody;
import com.abhi.LoginSignUp.features.authentication.model.AuthUser;
import com.abhi.LoginSignUp.features.authentication.model.SoilAnalysisRequest;
import com.abhi.LoginSignUp.features.authentication.repository.SoilAnalysisRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SoilAnalysisService {

    @Autowired
    private com.abhi.LoginSignUp.features.authentication.repository.SoilAnalysisRepository soilAnalysisRepository;

    /**
     * ✅ Submit a new Soil Analysis Request
     */
    public SoilAnalysisRequest submitSoilAnalysis(SoilAnalysisBody body, AuthUser user) {
        SoilAnalysisRequest request = new SoilAnalysisRequest();

        request.setUser(user); // Link the authenticated user
        request.setLocation(body.getLocation());
        request.setDepth(body.getDepth());
        request.setSoilType(user.getSoilType()); // Taking soil type from the user's profile
        request.setOrganicMatter(body.getOrganicMatter());
        request.setSoilTexture(body.getSoilTexture());
        request.setCropType(body.getCropType());
        request.setPreviousCrop(body.getPreviousCrop());
        request.setFertilizerUsed(body.getFertilizerUsed());
        request.setIrrigation(body.getIrrigation());
        request.setSoilDescription(body.getSoilDescription());

        return soilAnalysisRepository.save(request);
    }

    /**
     * ✅ Get all Soil Analysis Requests
     */
    public List<SoilAnalysisRequest> getAllSoilAnalysisRequests() {
        return soilAnalysisRepository.findAll();
    }

    /**
     * ✅ Get a single Soil Analysis Request by ID
     */
    public Optional<SoilAnalysisRequest> getSoilAnalysisById(Long id) {
        return soilAnalysisRepository.findById(id);
    }
}
