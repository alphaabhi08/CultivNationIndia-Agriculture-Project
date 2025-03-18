package com.abhi.LoginSignUp.features.authentication.filter;

import com.abhi.LoginSignUp.features.agroagency.model.Agroagency;
import com.abhi.LoginSignUp.features.agroagency.service.AgroagencyService;
import com.abhi.LoginSignUp.features.authentication.model.AuthUser;
import com.abhi.LoginSignUp.features.authentication.model.AuthUser.Role;
import com.abhi.LoginSignUp.features.authentication.service.AuthService;
import com.abhi.LoginSignUp.features.authentication.utils.JsonWebToken;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpFilter;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;

@Component
public class AuthFilter extends HttpFilter {
    private final List<String> unsecuredEndpoints = Arrays.asList(
            "/api/auth/login",
            "/api/auth/register",
            "/api/auth/send-password-reset-token",
            "/api/auth/reset-password",
            "/api/agroagency/login",
            "/api/agroagency/register",
            "/api/agroagency/products/all",
            "/api/admin/login"
    );

    @Autowired
    private JsonWebToken jsonWebToken;
    @Autowired
    private AuthService authService;
    @Autowired
    private AgroagencyService agroagencyService;

    @Override
    protected void doFilter(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws IOException, ServletException {
        response.addHeader("Access-Control-Allow-Origin", "http://localhost:5173");
        response.addHeader("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
        response.addHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
        response.addHeader("Access-Control-Allow-Credentials", "true");

        if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {
            response.setStatus(HttpServletResponse.SC_OK);
            return;
        }

        String path = request.getRequestURI();

        if (unsecuredEndpoints.contains(path)) {
            chain.doFilter(request, response);
            return;
        }

        try {
            String authorization = request.getHeader("Authorization");

            if (authorization == null || !authorization.startsWith("Bearer ")) {
                throw new ServletException("Token missing.");
            }

            String token = authorization.substring(7);
            if (jsonWebToken.isTokenExpired(token)) {
                throw new ServletException("Invalid token");
            }

            String email = jsonWebToken.getEmailFromToken(token);
            System.out.println("Extracted Email: " + email);

            // 🔹 Check if email exists in `AuthUser`
            AuthUser authUser = authService.getUser(email);
            Agroagency agroUser = null;

            if (authUser == null) {
                // If not found in `users`, check in `agroagency`
                agroUser = agroagencyService.getAgroUser(email);
            }

            boolean isAgroagency = (agroUser != null);
            boolean isAdmin = (authUser != null && authUser.getRoles() == Role.ADMIN);
            boolean isUser = (authUser != null && authUser.getRoles() == Role.USER);

            // 🔹 Restrict Product Modifications (Only Agroagency & Admin)
            if (path.startsWith("/api/agroagency/products")
                    && (request.getMethod().equals("POST")
                    || request.getMethod().equals("PUT")
                    || request.getMethod().equals("DELETE"))) {
                if (!isAgroagency && !isAdmin) {
                    throw new ServletException("Unauthorized: Only Agroagency and Admin can modify products.");
                }
            }


            if(path.startsWith("/api/admin")) {
                if(!isAdmin){
                    throw new ServletException("Unauthorized: Only Admin can access this resource.");
                }
            }

            // 🔹 Attach authenticated user/agroagency to request attributes
            if (isAgroagency) {
                request.setAttribute("authenticatedAgro", agroUser);
            } else if (authUser != null) {
                request.setAttribute("authenticatedUser", authUser);
            } else {
                throw new ServletException("User not found.");
            }

            chain.doFilter(request, response);

        } catch (Exception e) {
            e.printStackTrace();
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.setContentType("application/json");
            response.getWriter().write("{\"message\": \"Invalid authentication token, or token missing.\"}");
        }
    }
}
