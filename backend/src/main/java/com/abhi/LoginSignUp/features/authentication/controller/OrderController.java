package com.abhi.LoginSignUp.features.authentication.controller;

import com.abhi.LoginSignUp.features.authentication.model.AuthUser;
import com.abhi.LoginSignUp.features.authentication.model.Order;
import com.abhi.LoginSignUp.features.authentication.repository.UserRepo;
import com.abhi.LoginSignUp.features.authentication.service.OrderService;
import com.abhi.LoginSignUp.features.authentication.utils.JsonWebToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @Autowired
    private JsonWebToken jsonWebToken;

    @Autowired
    private UserRepo userRepo;

    @PostMapping("/place")
    public ResponseEntity<?> placeOrder(@RequestBody Order order,
                                        @RequestHeader("Authorization") String token
                                        ) {
        String email = jsonWebToken.getEmailFromToken(token.substring(7));
        AuthUser user =  userRepo.findByEmail(email).orElse(null);

        if(user == null) return ResponseEntity.status(404).body("User not found");

        order.setUser(user);
        return ResponseEntity.ok(orderService.placeOrder(order));
    }

    @GetMapping("/user")
    public ResponseEntity<?> getUserOrders(@RequestHeader("Authorization") String token) {
        String email = jsonWebToken.generateToken(token.substring(7));
        AuthUser user = userRepo.findByEmail(email).orElse(null);
        if(user == null) return ResponseEntity.status(404).body("User not found");

        return ResponseEntity.ok(orderService.getOrderByUser(user));
    }

    @GetMapping("/all")
    public ResponseEntity<List<Order>> getAllOrders() {
        return ResponseEntity.ok(orderService.getAllOrders());
    }



}
