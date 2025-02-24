package com.abhi.LoginSignUp.features.authentication.controller;

import com.abhi.LoginSignUp.features.authentication.dto.AuthRequestBody;
import com.abhi.LoginSignUp.features.authentication.dto.AuthResponseBody;
import com.abhi.LoginSignUp.features.authentication.dto.UserResponseDto;
import com.abhi.LoginSignUp.features.authentication.model.AuthUser;
import com.abhi.LoginSignUp.features.authentication.model.AuthUser.Role;
import com.abhi.LoginSignUp.features.authentication.service.AuthService;
import jakarta.mail.MessagingException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import com.abhi.LoginSignUp.dto.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.UnsupportedEncodingException;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @GetMapping("/user")
    public AuthUser getUser(@RequestAttribute("authenticatedUser") AuthUser authUser){
        return authService.getUser(authUser.getEmail());
    }

//    @GetMapping("/user")
//    public ResponseEntity<UserResponseDto> getUser(@RequestAttribute("authenticatedUser") AuthUser authUser){
//        UserResponseDto userDetails = authService.getUser(authUser);
//        return ResponseEntity.ok(userDetails);
//    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponseBody> loginUser(@Valid @RequestBody AuthRequestBody authRequestBody, HttpServletResponse response){
        String token = authService.login(authRequestBody);

        Cookie tokenCookie = new Cookie("token", token);
        tokenCookie.setHttpOnly(true);
        tokenCookie.setSecure(true);
        tokenCookie.setPath("/");
        tokenCookie.setMaxAge(7 * 24 * 60 * 60);
        response.addCookie(tokenCookie);

        return ResponseEntity.ok(new AuthResponseBody(token, "Login Successfull"));
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponseBody> registerUser(@Valid @RequestBody AuthRequestBody authRequestBody, HttpServletResponse response) throws MessagingException, UnsupportedEncodingException {
        String token = authService.register(authRequestBody);

        Cookie tokenCookie = new Cookie("token", token);
        tokenCookie.setHttpOnly(true);
        tokenCookie.setSecure(true);
        tokenCookie.setPath("/");
        tokenCookie.setMaxAge(7 * 24 * 60 * 60);
        response.addCookie(tokenCookie);

        return ResponseEntity.ok(new AuthResponseBody(token, "Register Successfull"));


    }

    @DeleteMapping("/delete")
    public Response deleteUser(@RequestAttribute("authenticatedUser") AuthUser user) {
        authService.deleteUser(user.getId());
        return new Response("User deleted successfully");
    }

    @PutMapping("/validate-email-verification-token")
    public Response verifyEmail(@RequestParam String otp, @RequestAttribute("authenticatedUser") AuthUser user){
        authService.validateEmailVerificationToken(otp, user.getEmail());
        return new Response("Email verified successfully");
    }

    @GetMapping("/send-email-verification-token")
    public Response sendEmailVerificationToken(@RequestAttribute("authenticatedUser") AuthUser user) {
        authService.sendEmailVerificationToken(user.getEmail());
        return new Response("Email verification token sent successfully.");
    }

    @PutMapping("/send-password-reset-token")
    public Response sendPasswordResetToken(@RequestParam String email) {
        authService.sendPasswordResetToken(email);
        return new Response("Password reset token sent successfully.");
    }

    @PutMapping("/reset-password")
    public Response resetPassword(@RequestParam String newPassword, @RequestParam String token,
                                  @RequestParam String email) {
        authService.resetPassword(email, newPassword, token);
        return new Response("Password reset successfully.");
    }

    @GetMapping("/users/{id}")
    public AuthUser getUserById(@PathVariable Long id) {
        return authService.getUserById(id);
    }

    @PutMapping("{userId}/update")
    public ResponseEntity<AuthUser> updateUserProfile(@PathVariable Long userId, @RequestBody AuthUser updateUserDetails){
        AuthUser updatedUser = authService.updateUserProfile(userId, updateUserDetails);
        return ResponseEntity.ok(updatedUser);
    }

    @PostMapping("/assign-role")
    public Response assignRole(@RequestParam String email, @RequestParam Role role){
        authService.assignRole(email, role);
        return new Response("Role Assigned Successfully");
    }

    @GetMapping("admin/dashboard")
    public Response adminDashboard(@RequestAttribute("authenticatedUser") AuthUser user){
        if(user.getRoles() != Role.ADMIN){
            return new Response("Access Denied: Admin Only");
        }else{
            return new Response("Welcome to the Admin Dashboard");
        }
    }

    @GetMapping("/agroagency/dashboard")
    public Response agroAgencyDashboard(@RequestAttribute("authenticatedUser") AuthUser user){
        if(user.getRoles() != Role.AGROAGENCY){
            return new Response("Access Denied: AgroAgency only");
        }
        else{
            return new Response("Welcome to the AgroAgency Dashboard");
        }
    }




}
