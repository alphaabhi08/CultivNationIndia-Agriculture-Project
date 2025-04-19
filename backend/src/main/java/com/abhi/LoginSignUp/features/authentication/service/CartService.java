package com.abhi.LoginSignUp.features.authentication.service;

import com.abhi.LoginSignUp.features.agroagency.model.Product;
import com.abhi.LoginSignUp.features.agroagency.repository.ProductRepository;
import com.abhi.LoginSignUp.features.authentication.dto.CartItemDTO;
import com.abhi.LoginSignUp.features.authentication.model.AuthUser;
import com.abhi.LoginSignUp.features.authentication.model.Cart;
import com.abhi.LoginSignUp.features.authentication.repository.CartRepository;
import com.abhi.LoginSignUp.features.authentication.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Base64;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CartService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private ProductRepository productRepository;

    @Transactional
    public List<CartItemDTO> getCartItems(String email){
        AuthUser user = userRepo.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
        List<Cart> items = cartRepository.findByUser(user);

        return items.stream().map(item -> new CartItemDTO(
                item.getId(),
                item.getProduct().getId(),
                item.getProduct().getProdName(),
                item.getProduct().getBestPrice(),
                item.getProduct().getCurrMarketPrice(),
                item.getQuantity(),
                item.getProduct().getImageType(),
                Base64.getEncoder().encodeToString(item.getProduct().getImageData())
        )).collect(Collectors.toList());
    }

    public void updateCartItemQuantity(Long cartId, int newQuantity) {
        if(newQuantity <= 0) {
            throw new IllegalArgumentException("Quantity must be positive");
        }
        Cart cartItem = cartRepository.findById(cartId).orElseThrow(() -> new RuntimeException("Cart item not found"));
        cartItem.setQuantity(newQuantity);
        cartRepository.save(cartItem);
    }

    public Cart addToCart(String email, Long productId, int quantity){

        AuthUser user = userRepo.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
        Product product = productRepository.findById(productId).orElseThrow(() -> new RuntimeException("Product not found"));

        return cartRepository.findByUserAndProduct(user, product).map(exist -> {
                exist.setQuantity(exist.getQuantity() + quantity);
                return cartRepository.save(exist);
                }).orElseGet(() -> cartRepository.save(new Cart(user, product, quantity)));
    }

    public void removeFromCart(Long cartItemId){
        if(!cartRepository.existsById(cartItemId)) throw new RuntimeException("Cart Item not found");

        cartRepository.deleteAllById(Collections.singleton(cartItemId));
    }

    @Transactional
    public void clearCart(String email){
        AuthUser user = userRepo.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
        List<Cart> items = cartRepository.findByUser(user);
    }






}
