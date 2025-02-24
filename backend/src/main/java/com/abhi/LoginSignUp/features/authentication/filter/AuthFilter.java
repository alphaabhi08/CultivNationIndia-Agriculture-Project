package com.abhi.LoginSignUp.features.authentication.filter;

import com.abhi.LoginSignUp.features.agroagency.model.Agroagency;
import com.abhi.LoginSignUp.features.agroagency.service.AgroagencyService;
import com.abhi.LoginSignUp.features.authentication.dto.UserResponseDto;
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
            "/api/agroagency/register"
    );

    @Autowired
    private JsonWebToken jsonWebToken;
    @Autowired
    private AuthService authService;
    @Autowired
    private AgroagencyService agroagencyService;

    @Override
    protected void doFilter(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws IOException, ServletException{
        response.addHeader("Access-Control-Allow-Origin", "http://localhost:5173");
        response.addHeader("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
        response.addHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
        response.addHeader("Access-Control-Allow-Credentials", "true");

        if ("OPTIONS".equalsIgnoreCase(request.getMethod())){
            response.setStatus(HttpServletResponse.SC_OK);
            return;
        }
        String path = request.getRequestURI();

        if(unsecuredEndpoints.contains(path)){
            chain.doFilter(request, response);
            return;
        }

        try{
            String authorization = request.getHeader("Authorization");

            if (authorization == null || !authorization.startsWith("Bearer ")){
                throw new ServletException("Token missing.");
            }
            String token = authorization.substring(7);

            if(jsonWebToken.isTokenExpired(token)){
                throw new ServletException("Invalid token");
            }

            String email = jsonWebToken.getEmailFromToken(token);
            System.out.println("Extracted Email: " + email); // Debugging
//
//            AuthUser user = authService.getUser(email);
//            request.setAttribute("authenticatedUser", user);
//            chain.doFilter(request, response);

            if (path.startsWith("/api/agroagency")) {
                // Agroagency authentication
                Agroagency agroUser = agroagencyService.getAgroUser(email);
                if (agroUser == null) {
                    throw new ServletException("Agroagency not found.");
                }
                request.setAttribute("authenticatedAgro", agroUser);
            } else {
                // Normal User authentication
                AuthUser user = authService.getUser(email);
                if (user == null) {
                    throw new ServletException("User not found.");
                }
                request.setAttribute("authenticatedUser", user);
            }

            chain.doFilter(request, response);



        } catch (Exception e) {
            e.printStackTrace();
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.setContentType("application/json");
            response.getWriter().write("{\"message\": \"Invalid authentication token, or token missing.\"}");
        }
    }



//    private boolean isAuthorized(AuthUser user, String path) {
//        if (path.startsWith("/admin") && user.getRoles() != Role.ADMIN) {
//            return false;
//        }
//        if (path.startsWith("/agroagency") && user.getRoles() != Role.AGROAGENCY) {
//            return false;
//        }
//        return true;
//    }
}
