package com.abhi.LoginSignUp.features.agroagency.service;

import com.abhi.LoginSignUp.features.agroagency.model.Agroagency;
import com.abhi.LoginSignUp.features.agroagency.repository.AgroagencyRepo;
import com.abhi.LoginSignUp.features.authentication.dto.AuthResponseBody;
import com.abhi.LoginSignUp.features.authentication.model.AuthUser;
import com.abhi.LoginSignUp.features.authentication.utils.Encoder;
import com.abhi.LoginSignUp.features.authentication.utils.JsonWebToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

@Service
public class AgroagencyService {

    @Autowired
    private JsonWebToken jsonWebToken;

    @Autowired
    private AgroagencyRepo agroagencyRepo;

    @Autowired
    private Encoder encoder;

    public AuthResponseBody register(Agroagency agency, MultipartFile certificateImage) throws IOException {
        if(agroagencyRepo.findByEmail(agency.getEmail()).isPresent()) {
            throw new IllegalArgumentException("Email Already exists");
        }

        Agroagency newAgency = Agroagency.builder()
                .agencyName(agency.getAgencyName())
                .email(agency.getEmail())
                .password(encoder.encode(agency.getPassword()))
                .mobile(agency.getMobile())
                .district(agency.getDistrict())
                .town(agency.getTown())
                .address(agency.getAddress())
                .role(AuthUser.Role.AGROAGENCY)
                .imageName(certificateImage.getOriginalFilename())
                .imageType(certificateImage.getContentType())
                .imageData(certificateImage.getBytes())
                .build();

        agroagencyRepo.save(newAgency);

        String token = jsonWebToken.generateToken(agency.getEmail());
        return new AuthResponseBody(token, "User Registered Successfully");
    }

//    public AuthResponseBody login(String email, String password){
//        Optional<Agroagency> optionalAgroagency = agroagencyRepo.findByEmail(email);
//
//        if(optionalAgroagency.isEmpty()){
//            throw new IllegalArgumentException("Invalid email or password");
//        }
//        Agroagency agency = optionalAgroagency.get();
//        if(!encoder.matches(password, agency.getPassword())) {
//            throw new IllegalArgumentException("Invalid email or password");
//        }
//        String token = jsonWebToken.generateToken(agency.getEmail());
//        return new AuthResponseBody(token, "Login successful");
//    }

    @Transactional
    public AuthResponseBody login(String email, String password) {
        Optional<Agroagency> optionalAgroagency = agroagencyRepo.findByEmail(email);

        if (optionalAgroagency.isEmpty()) {
            throw new IllegalArgumentException("Invalid email or password");
        }

        Agroagency agency = optionalAgroagency.get();

        // Ensure that the image data is not accessed
        agency.setImageData(null);

        if (!encoder.matches(password, agency.getPassword())) {
            throw new IllegalArgumentException("Invalid email or password");
        }

        String token = jsonWebToken.generateToken(agency.getEmail());
        return new AuthResponseBody(token, "Login successful");
    }

//    public Agroagency getAgroUser(String email) {
//        return  agroagencyRepo.findByEmail(email).orElseThrow(() -> new IllegalArgumentException("User not found"));
//    }

    public Agroagency getAgroUser(String email) {
        return  agroagencyRepo.findByEmail(email).orElse(null);
    }

    public Agroagency updateAgroProfile(Long AgroId, Agroagency updateAgroDetails) {
        return agroagencyRepo.findById(AgroId)
                .map(agro -> {
                    agro.setAgencyName(updateAgroDetails.getAgencyName());
                    agro.setMobile(updateAgroDetails.getMobile());
                    agro.setDistrict(updateAgroDetails.getDistrict());
                    agro.setTown(updateAgroDetails.getTown());
                    agro.setAddress(updateAgroDetails.getAddress());
                    return agroagencyRepo.save(agro);
                })
                .orElseThrow(() -> new IllegalArgumentException("Agroagency Not found with id: " + AgroId));
    }





}
