package com.abhi.LoginSignUp.features.admin.paymentService;

import com.stripe.exception.StripeException;
import com.stripe.model.Event;
import com.stripe.model.checkout.Session;
import com.stripe.net.Webhook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/stripe")
public class StripeController {

    @Autowired
    private StripeService stripeService;

    @PostMapping("/create-checkout-session")
    public ResponseEntity<?> createCheckoutSession(@RequestBody CheckoutRequest request) {
        try {
            if (request.getProdName() == null || request.getPrices() == null || request.getQuantities() == null) {
                return ResponseEntity.badRequest().body(Map.of("error", "Invalid request data"));
            }

            String checkoutUrl = stripeService.createCheckoutSession(
                    request.getProdName(),
                    request.getPrices(),
                    request.getQuantities()
            );

            // ✅ Only return a Map with simple String URL
            return ResponseEntity.ok(Map.of("checkoutUrl", checkoutUrl));

        } catch (StripeException e) {
            return ResponseEntity.internalServerError()
                    .body(Map.of("error", "Stripe error: " + e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body(Map.of("error", "Internal error: " + e.getMessage()));
        }
    }
}

