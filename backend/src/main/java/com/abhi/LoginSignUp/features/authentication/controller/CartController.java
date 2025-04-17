package com.abhi.LoginSignUp.features.authentication.controller;

import com.abhi.LoginSignUp.features.authentication.dto.CartItemDTO;
import com.abhi.LoginSignUp.features.authentication.model.Cart;
import com.abhi.LoginSignUp.features.authentication.service.CartService;
import com.abhi.LoginSignUp.features.authentication.utils.JsonWebToken;
import jakarta.websocket.server.PathParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    @Autowired
    private CartService cartService;

    @Autowired
    private JsonWebToken jsonWebToken;

    @GetMapping
    public ResponseEntity<List<CartItemDTO>> getCart(@RequestHeader("Authorization") String token){
        String email = jsonWebToken.getEmailFromToken(token.substring(7));
        return ResponseEntity.ok(cartService.getCartItems(email));
    }

    @PostMapping("/add")
    public ResponseEntity<Cart> addToCart(
            @RequestHeader("Authorization") String token,
            @RequestParam Long productId,
            @RequestParam int quantity) {
        String email = jsonWebToken.getEmailFromToken(token.substring(7));
        return ResponseEntity.ok(cartService.addToCart(email, productId, quantity));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<String> updateQuantity(
            @PathVariable Long id,
            @RequestParam int quantity) {

        cartService.updateCartItemQuantity(id, quantity);
        return ResponseEntity.ok("Quantity updated successfully");
    }

    @DeleteMapping("/remove/{id}")
    public ResponseEntity<String> removeCartItem(@PathVariable Long id){
        cartService.removeFromCart(id);
        return ResponseEntity.ok("Cart item removed");
    }

    @DeleteMapping("/clear")
    public ResponseEntity<String> clearCart(@RequestHeader("Authorization") String token){
        String email = jsonWebToken.getEmailFromToken(token.substring(7));
        cartService.clearCart(email);
        return ResponseEntity.ok("Cart Cleared");
    }


}
