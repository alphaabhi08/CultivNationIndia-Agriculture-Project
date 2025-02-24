package com.abhi.LoginSignUp.features.agroagency.repository;

import com.abhi.LoginSignUp.features.agroagency.model.Agroagency;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AgroagencyRepo extends JpaRepository<Agroagency, Long> {

    Optional<Agroagency> findByEmail(String email);

}
