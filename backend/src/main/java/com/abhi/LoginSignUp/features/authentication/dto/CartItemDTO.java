package com.abhi.LoginSignUp.features.authentication.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class CartItemDTO {

    private Long id;
    private Long productId;
    private String prodName;
    private String price;
    private String marketPrice;
    private int quantity;
    private String imageType;
    private String imageData;

    public CartItemDTO(Long id, Long productId, String prodName,
                       String price, String marketPrice, int quantity,
                       String imageType, String imageData) {
        this.id = id;
        this.productId = productId;
        this.prodName = prodName;
        this.price = price;
        this.marketPrice = marketPrice;
        this.quantity = quantity;
        this.imageType = imageType;
        this.imageData = imageData;
    }

}
