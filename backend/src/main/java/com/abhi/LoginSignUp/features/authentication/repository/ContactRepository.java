package com.abhi.LoginSignUp.features.authentication.repository;

import com.abhi.LoginSignUp.features.authentication.model.ContactRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ContactRepository extends JpaRepository<ContactRequest, Long> {
//    List<ContactRequest> findByEmail(String email);
    List<ContactRequest> findByUser_Email(String email);


}
