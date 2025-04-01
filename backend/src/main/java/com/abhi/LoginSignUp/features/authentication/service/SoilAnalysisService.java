package com.abhi.LoginSignUp.features.authentication.service;

import com.abhi.LoginSignUp.features.authentication.dto.SoilAnalysisBody;
import com.abhi.LoginSignUp.features.authentication.model.AuthUser;
import com.abhi.LoginSignUp.features.authentication.model.SoilAnalysisRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SoilAnalysisService {

    @Autowired
    private com.abhi.LoginSignUp.features.authentication.repository.SoilAnalysisRepository soilAnalysisRepository;

    public SoilAnalysisRequest submitSoilAnalysis(SoilAnalysisBody body, AuthUser user) {
        SoilAnalysisRequest request = new SoilAnalysisRequest();

        request.setUser(user);
        request.setLocation(body.getLocation());
        request.setDepth(body.getDepth());
        request.setSoilType(user.getSoilType());
        request.setOrganicMatter(body.getOrganicMatter());
        request.setSoilTexture(body.getSoilTexture());
        request.setCropType(body.getCropType());
        request.setPreviousCrop(body.getPreviousCrop());
        request.setFertilizerUsed(body.getFertilizerUsed());
        request.setIrrigation(body.getIrrigation());
        request.setSoilDescription(body.getSoilDescription());

        return soilAnalysisRepository.save(request);
    }

    public List<SoilAnalysisRequest> getAllSoilAnalysisRequests() {
        return soilAnalysisRepository.findAll();
    }

    public List<SoilAnalysisRequest> getUserSoilAnalysisRequests(String email) {
        return soilAnalysisRepository.findByUserEmail(email);
    }

    public boolean withdrawSoilAnalysisRequest(Long id) {
        Optional<SoilAnalysisRequest> request = soilAnalysisRepository.findById(id);
        if(request.isPresent()) {
            soilAnalysisRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
