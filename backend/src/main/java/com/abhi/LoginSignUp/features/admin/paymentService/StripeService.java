package com.abhi.LoginSignUp.features.admin.paymentService;

import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StripeService {

    @Value("${stripe.api.key}")
    private String stripeApiKey;

    @Value("${frontend.success.url}")
    private String successUrl;

    @Value("${frontend.cancel.url}")
    private String cancelUrl;

    public String createCheckoutSession(List<String> productNames, List<Long> prices, List<Long> quantities) throws StripeException {
        Stripe.apiKey = stripeApiKey;

        SessionCreateParams.Builder builder = new SessionCreateParams.Builder()
                .setMode(SessionCreateParams.Mode.PAYMENT)
                .setSuccessUrl(successUrl)
                .setCancelUrl(cancelUrl);

        for (int i = 0; i < productNames.size(); i++) {
            builder.addLineItem(
                    SessionCreateParams.LineItem.builder()
                            .setPriceData(
                                    SessionCreateParams.LineItem.PriceData.builder()
                                            .setCurrency("usd")
                                            .setUnitAmount(prices.get(i) * 100)
                                            .setProductData(
                                                    SessionCreateParams.LineItem.PriceData.ProductData.builder()
                                                            .setName(productNames.get(i))
                                                            .build()
                                            )
                                            .build()
                            )
                            .setQuantity(quantities.get(i))
                            .build()
            );
        }

        Session session = Session.create(builder.build());
        return session.getSuccessUrl();
    }
}
