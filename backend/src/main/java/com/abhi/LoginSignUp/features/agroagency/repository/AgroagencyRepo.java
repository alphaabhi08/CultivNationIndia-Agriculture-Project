package com.abhi.LoginSignUp.features.agroagency.repository;

import com.abhi.LoginSignUp.features.agroagency.model.Agroagency;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AgroagencyRepo extends JpaRepository<Agroagency, Long> {

    @Query("SELECT new com.abhi.LoginSignUp.features.agroagency.model.Agroagency(a.id, a.agencyName, a.email, a.password, a.mobile, a.district, a.town, a.address, a.role, a.accountStatus) " +
            "FROM Agroagency a WHERE a.email = :email")
    Optional<Agroagency> findByEmailWithoutImage(@Param("email") String email);

    Optional<Agroagency> findByEmail(String email);

}
