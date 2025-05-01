package com.abhi.LoginSignUp.features.admin.paymentService;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CheckoutRequest {

    private List<String> prodName;
    private List<Long> prices;
    private List<Long> quantities;

}
