package com.abhi.LoginSignUp.features.authentication.service;

import com.abhi.LoginSignUp.features.authentication.model.AuthUser;
import com.abhi.LoginSignUp.features.authentication.model.ContactRequest;
import com.abhi.LoginSignUp.features.authentication.repository.ContactRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ContactService {

    @Autowired
    private ContactRepository contactRepository;

    public ContactRequest saveContactRequest(ContactRequest contactRequest, AuthUser user){
        contactRequest.setUser(user);
        return contactRepository.save(contactRequest);
    }

    public List<ContactRequest> getAllContactRequest(){
        return contactRepository.findAll();
    }

    public List<ContactRequest> getUserContactRequest(String email){
        return contactRepository.findByUser_Email(email);
    }

    public boolean withdrawnContactRequest(Long id){
        Optional<ContactRequest> request = contactRepository.findById(id);
        if(request.isPresent()) {
            contactRepository.deleteById(id);
            return true;
        }
        return false;
    }

}
