package com.abhi.LoginSignUp.features.authentication.repository;

import com.abhi.LoginSignUp.features.agroagency.model.Product;
import com.abhi.LoginSignUp.features.authentication.model.AuthUser;
import com.abhi.LoginSignUp.features.authentication.model.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CartRepository extends JpaRepository<Cart, Long> {

    List<Cart> findByUser(AuthUser user);

    Optional<Cart> findByUserAndProduct(AuthUser user, Product product);

}
