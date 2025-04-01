package com.abhi.LoginSignUp.features.admin.paymentService;

import com.stripe.exception.StripeException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/stripe")
public class StripeController {

    @Autowired
    private StripeService stripeService;

    @PostMapping("/create-checkout-session")
    public Map<String, String> createCheckoutSession(@RequestBody Map<String, Object> requestData) {
        try {
            List<String> productNames = (List<String>) requestData.get("productNames");
            List<Long> prices = (List<Long>) requestData.get("prices");
            List<Long> quantities = (List<Long>) requestData.get("quantities");

            String checkoutUrl = stripeService.createCheckoutSession(productNames, prices, quantities);
            return Map.of("checkoutUrl", checkoutUrl);
        } catch (StripeException e) {
            return Map.of("error", "Failed to create Stripe session");
        }
    }
}

