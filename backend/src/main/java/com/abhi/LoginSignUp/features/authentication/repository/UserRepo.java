package com.abhi.LoginSignUp.features.authentication.repository;

import com.abhi.LoginSignUp.features.authentication.model.AuthUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepo extends JpaRepository<AuthUser, Long> {

    Optional<AuthUser> findByEmail(String email);
    boolean existsByEmail(String email);

    List<AuthUser> findByRoles(AuthUser.Role role);
}
