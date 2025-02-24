package com.abhi.LoginSignUp.features.agroagency.controller;

import com.abhi.LoginSignUp.features.agroagency.model.Agroagency;
import com.abhi.LoginSignUp.features.agroagency.service.AgroagencyService;
import com.abhi.LoginSignUp.features.authentication.dto.AuthResponseBody;
import com.abhi.LoginSignUp.features.authentication.utils.JsonWebToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api/agroagency")
public class AgroagencyController {

    @Autowired
    private AgroagencyService agroagencyService;
    @Autowired
    private JsonWebToken jsonWebToken;

    @PostMapping("/register")
    public ResponseEntity<AuthResponseBody> register (
            @RequestPart("agroagency") Agroagency agroagency,
            @RequestPart("certificateImage") MultipartFile certificateImage
            ) {
        if(certificateImage == null || certificateImage.isEmpty()){
            throw new IllegalArgumentException("Certificate image is required");
        }
        try {
            AuthResponseBody response = agroagencyService.register(agroagency, certificateImage);
            return ResponseEntity.ok(response);
        } catch (IOException e) {
            return ResponseEntity.badRequest().body(new AuthResponseBody(null, "Error processing image: " + e.getMessage()));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(new AuthResponseBody(null, e.getMessage()));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponseBody> login(@RequestBody Agroagency agroagency) {
        try {
            AuthResponseBody response = agroagencyService.login(agroagency.getEmail(), agroagency.getPassword());
            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new AuthResponseBody(null, e.getMessage()));
        } catch (Exception e) {
            e.printStackTrace(); // Log the full stack trace
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new AuthResponseBody(null, "An error occurred during login: " + e.getMessage()));
        }
    }

    @GetMapping("/agro-profile")
    public Agroagency getAgro(@RequestAttribute("authenticatedAgro") Agroagency agroagency){
        return agroagencyService.getAgroUser(agroagency.getEmail());
    }



    @PutMapping("/{agroId}/update")
    public ResponseEntity<Agroagency> updateAgroProfile(@PathVariable Long agroId, @RequestBody Agroagency updateAgroDetails) {
        Agroagency updatedAgro = agroagencyService.updateAgroProfile(agroId, updateAgroDetails);
        return ResponseEntity.ok(updatedAgro);
    }



}
