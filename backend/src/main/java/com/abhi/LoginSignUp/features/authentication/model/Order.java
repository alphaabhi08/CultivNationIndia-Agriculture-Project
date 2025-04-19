package com.abhi.LoginSignUp.features.authentication.model;

import com.abhi.LoginSignUp.features.agroagency.model.Product;
//import jakarta.persistence.*;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Table(name = "orders")
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private AuthUser user;

    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    private int quantity;

    private String unitPrice;

    private String totalPrice;

    private LocalDateTime createdAt;

    @Enumerated(EnumType.STRING)
    private Status orderStatus;

    public enum Status {
        PENDING, COMPLETED, CANCELLED
    }
}
