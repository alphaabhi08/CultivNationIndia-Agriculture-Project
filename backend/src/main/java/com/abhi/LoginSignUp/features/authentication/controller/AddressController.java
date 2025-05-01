package com.abhi.LoginSignUp.features.authentication.controller;


import com.abhi.LoginSignUp.features.authentication.model.Address;
import com.abhi.LoginSignUp.features.authentication.model.AuthUser;
import com.abhi.LoginSignUp.features.authentication.repository.UserRepo;
import com.abhi.LoginSignUp.features.authentication.service.AddressService;
import com.abhi.LoginSignUp.features.authentication.utils.JsonWebToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/address")
public class AddressController {

    @Autowired
    private AddressService addressService;

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private JsonWebToken jwtUtil;

    @PostMapping("/add")
    public ResponseEntity<?> addAddress(@RequestBody Address address, @RequestHeader("Authorization") String token) {
        String jwtToken = token.substring(7);
        String userEmail = jwtUtil.getEmailFromToken(jwtToken);

        AuthUser user = userRepo.findByEmail(userEmail).orElse(null);
        if (user == null) {
            return ResponseEntity.status(404).body("User not found");
        }

        Address saved = addressService.saveAddress(address, user);
        return ResponseEntity.ok(saved);
    }

    @GetMapping("/user")
    public ResponseEntity<List<Address>> getUserAddresses(@RequestHeader("Authorization") String token) {
        String jwtToken = token.substring(7);
        String userEmail = jwtUtil.getEmailFromToken(jwtToken);
        List<Address> addresses = addressService.getUserAddresses(userEmail);
        return ResponseEntity.ok(addresses);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteAddress(@PathVariable Long id) {
        if (addressService.deleteAddress(id)) {
            return ResponseEntity.ok("Address deleted successfully");
        } else {
            return ResponseEntity.status(404).body("Address not found");
        }
    }
}

