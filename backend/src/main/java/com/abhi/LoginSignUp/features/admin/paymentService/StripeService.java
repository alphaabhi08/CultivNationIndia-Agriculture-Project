package com.abhi.LoginSignUp.features.admin.paymentService;

import com.abhi.LoginSignUp.features.authentication.model.AuthUser;
import com.abhi.LoginSignUp.features.authentication.model.Cart;
import com.abhi.LoginSignUp.features.authentication.model.Order;
import com.abhi.LoginSignUp.features.authentication.repository.CartRepository;
import com.abhi.LoginSignUp.features.authentication.repository.OrderRepository;
import com.abhi.LoginSignUp.features.authentication.repository.UserRepo;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class StripeService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private UserRepo userRepo;

    @Value("${stripe.api.key}")
    private String stripeApiKey;

    @Value("${frontend.success.url}")
    private String successUrl;

    @Value("${frontend.cancel.url}")
    private String cancelUrl;


    public String createCheckoutSession(List<String> prodName, List<Long> prices, List<Long> quantities) throws StripeException {
        if (prodName.size() != prices.size() || prices.size() != quantities.size()) {
            throw new IllegalArgumentException("Product Names, Prices & Quantities must have same size.");
        }

        Stripe.apiKey = stripeApiKey;

        SessionCreateParams.Builder builder = new SessionCreateParams.Builder()
                .setMode(SessionCreateParams.Mode.PAYMENT)
                .setSuccessUrl(successUrl + "?session_id={CHECKOUT_SESSION_ID}")
                .setCancelUrl(cancelUrl);

        for (int i = 0; i < prodName.size(); i++) {
            builder.addLineItem(
                    SessionCreateParams.LineItem.builder()
                            .setPriceData(
                                    SessionCreateParams.LineItem.PriceData.builder()
                                            .setCurrency("inr")
                                            .setUnitAmount(prices.get(i) * 100)
                                            .setProductData(
                                                    SessionCreateParams.LineItem.PriceData.ProductData.builder()
                                                            .setName(prodName.get(i))
                                                            .build()
                                            )
                                            .build()
                            )
                            .setQuantity(quantities.get(i))
                            .build()
            );
        }

        Session session = Session.create(builder.build());
        return session.getUrl();
    }


//    public String createCheckoutSession(List<String> prodName, List<Long> prices, List<Long> quantities) throws StripeException {
//
//        if(prodName.size() != prices.size() || prices.size() != quantities.size()){
//            throw new IllegalArgumentException("Product Names, Prices & Quantities must have same size.");
//        }
//
//        Stripe.apiKey = stripeApiKey;
//
//        SessionCreateParams.Builder builder = new SessionCreateParams.Builder()
//                .setMode(SessionCreateParams.Mode.PAYMENT)
//                .setSuccessUrl(successUrl + "?session_id={CHECKOUT_SESSION_ID}")
//                .setCancelUrl(cancelUrl);
//
//        for (int i = 0; i < prodName.size(); i++) {
//            builder.addLineItem(
//                    SessionCreateParams.LineItem.builder()
//                            .setPriceData(
//                                    SessionCreateParams.LineItem.PriceData.builder()
//                                            .setCurrency("inr")
//                                            .setUnitAmount(prices.get(i) * 100)
//                                            .setProductData(
//                                                    SessionCreateParams.LineItem.PriceData.ProductData.builder()
//                                                            .setName(prodName.get(i))
//                                                            .build()
//                                            )
//                                            .build()
//                            )
//                            .setQuantity(quantities.get(i))
//                            .build()
//            );
//        }
//
//        Session session = Session.create(builder.build());
////        return session.getId();
//        return session.getSuccessUrl();
//    }

}
