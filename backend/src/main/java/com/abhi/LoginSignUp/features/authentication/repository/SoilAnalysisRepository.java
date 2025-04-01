package com.abhi.LoginSignUp.features.authentication.repository;

import com.abhi.LoginSignUp.features.authentication.model.SoilAnalysisRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SoilAnalysisRepository extends JpaRepository<SoilAnalysisRequest, Long> {
    List<SoilAnalysisRequest> findByUserEmail(String email);
}
