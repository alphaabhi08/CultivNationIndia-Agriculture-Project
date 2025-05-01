package com.abhi.LoginSignUp.features.authentication.service;

import com.abhi.LoginSignUp.features.authentication.model.AuthUser;
import com.abhi.LoginSignUp.features.authentication.model.Order;
import com.abhi.LoginSignUp.features.authentication.repository.OrderRepository;
import com.abhi.LoginSignUp.features.authentication.repository.UserRepo;
import com.stripe.model.checkout.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private UserRepo userRepo;

    public Order placeOrder(Order order){
        order.setCreatedAt(LocalDateTime.now());
        order.setOrderStatus(Order.Status.PENDING);
        return orderRepository.save(order);
    }

    public List<Order> getOrderByUser(AuthUser user){
        return orderRepository.findByUser(user);
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

//    public void createOrderFromSession(Session session) {
//        String email = session.getCustomerDetails().getEmail();
//
//        AuthUser user = userRepo.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
//
//        Order order = new Order();
//        order.setUser(user);
//        order.setUser();
//    }

}
