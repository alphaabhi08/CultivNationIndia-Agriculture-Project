package com.abhi.LoginSignUp.features.authentication.controller;

import com.abhi.LoginSignUp.features.authentication.model.AuthUser;
import com.abhi.LoginSignUp.features.authentication.model.ContactRequest;
import com.abhi.LoginSignUp.features.authentication.repository.ContactRepository;
import com.abhi.LoginSignUp.features.authentication.repository.UserRepo;
import com.abhi.LoginSignUp.features.authentication.service.ContactService;
import com.abhi.LoginSignUp.features.authentication.utils.JsonWebToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/api/contact")
public class ContactController {

    @Autowired
    private ContactService contactService;

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private JsonWebToken jsonWebToken;

    @PostMapping("/submit")
    public ResponseEntity<?> submitContactForm(
            @RequestBody ContactRequest contactRequest,
            @RequestHeader("Authorization") String token)
    {
        String jwtToken = token.substring(7);
        String userEmail = jsonWebToken.getEmailFromToken(jwtToken);

        AuthUser user = userRepo.findByEmail(userEmail).orElse(null);

        if(user == null) {
            return ResponseEntity.status(404).body("User not found");
        }
        ContactRequest savedRequest = contactService.saveContactRequest(contactRequest, user);

        return ResponseEntity.ok(savedRequest);
    }

    @GetMapping("/all")
    public ResponseEntity<List<ContactRequest>> getAllContactRequests(){
        List<ContactRequest> contactRequests = contactService.getAllContactRequest();
        return ResponseEntity.ok(contactRequests);
    }

    @GetMapping("/user-contact")
    public ResponseEntity<?> getContactRequestById(
            @RequestHeader("Authorization") String token
    ) {

        String jwtToken = token.substring(7);
        String user = jsonWebToken.getEmailFromToken(jwtToken);

        List<ContactRequest> request = contactService.getUserContactRequest(user);

        if(user.isEmpty()) {
            return ResponseEntity.status(404).body(null);
        }
        return ResponseEntity.ok(request);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteContactRequest(
            @PathVariable Long id
    ) {
        boolean isDeleted = contactService.withdrawnContactRequest(id);
        if(isDeleted) {
            return ResponseEntity.ok(Collections.singletonMap("message",  "Contact Request Deleted successfully"));
        } else {
            return ResponseEntity.status(404).body(Collections.singletonMap("error", "Contact Request not found or already deleted"));
        }






    }

}
