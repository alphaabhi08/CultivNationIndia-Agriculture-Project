package com.abhi.LoginSignUp.features.agroagency.repository;

import com.abhi.LoginSignUp.features.agroagency.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
}
