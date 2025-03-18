package com.abhi.LoginSignUp.features.admin;

import com.abhi.LoginSignUp.features.agroagency.model.Agroagency;
import com.abhi.LoginSignUp.features.agroagency.repository.AgroagencyRepo;
import com.abhi.LoginSignUp.features.authentication.dto.AuthRequestBody;
import com.abhi.LoginSignUp.features.authentication.model.AuthUser;
import com.abhi.LoginSignUp.features.authentication.repository.UserRepo;
import com.abhi.LoginSignUp.features.authentication.utils.Encoder;
import com.abhi.LoginSignUp.features.authentication.utils.JsonWebToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private AgroagencyRepo agroagencyRepo;

    @Autowired
    private JsonWebToken jsonWebToken;

    @Autowired
    private Encoder encoder;

    @PostMapping("/login")
    public ResponseEntity<?> adminLogin(@RequestBody AdminBody authBody) {
        AuthUser admin = userRepo.findByEmail(authBody.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid Credential or Access Denied"));

        if (!admin.getRoles().equals(AuthUser.Role.ADMIN)) {
            throw new RuntimeException("Access denied. Not an admin.");
        }

        if (!encoder.matches(authBody.getPassword(), admin.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        String token = jsonWebToken.generateToken(admin.getEmail());

        return ResponseEntity.ok(Map.of(
                "token", token,
                "email", admin.getEmail(),
                "name", admin.getFirstName()
        ));
    }

    @GetMapping("/farmers")
    public ResponseEntity<List<AuthUser>> getAllFarmers() {
        return ResponseEntity.ok(userRepo.findByRoles(AuthUser.Role.USER));
    }

    @GetMapping("/agroagencies")
    public ResponseEntity<List<Agroagency>> getAllAgroAgencies() {
        return ResponseEntity.ok(agroagencyRepo.findAll());
    }

//    @PutMapping("/agroagency/approve/{id}")
//    public ResponseEntity<?> approvedAgency(@PathVariable Long id) {
//        return agroagencyRepo.findById(id).map(agency -> {
//            agency.setAccountStatus(Agroagency.AccountStatus.APPROVED);
//            agroagencyRepo.save(agency);
//            return ResponseEntity.ok("Agroagency approved successfully");
//        }).orElseThrow(() -> new IllegalArgumentException("Agroagency not found"));
//    }
//
//    @PutMapping("/agroagency/approve/{id}")
//    public ResponseEntity<?> rejectedAgency(@PathVariable Long id) {
//        return agroagencyRepo.findById(id).map(agency -> {
//            agency.setAccountStatus(Agroagency.AccountStatus.REJECTED);
//            agroagencyRepo.save(agency);
//            return ResponseEntity.ok("Agroagency rejected successfully");
//        }).orElseThrow(() -> new IllegalArgumentException("Agroagency not found"));
//    }



}
