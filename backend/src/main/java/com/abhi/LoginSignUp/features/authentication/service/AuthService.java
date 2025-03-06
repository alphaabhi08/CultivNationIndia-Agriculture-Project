package com.abhi.LoginSignUp.features.authentication.service;


import com.abhi.LoginSignUp.features.authentication.dto.AuthRequestBody;
import com.abhi.LoginSignUp.features.authentication.dto.AuthResponseBody;
import com.abhi.LoginSignUp.features.authentication.dto.UserResponseDto;
import com.abhi.LoginSignUp.features.authentication.model.AuthUser;
import com.abhi.LoginSignUp.features.authentication.repository.UserRepo;
import com.abhi.LoginSignUp.features.authentication.utils.EmailService;
import com.abhi.LoginSignUp.features.authentication.utils.Encoder;
import com.abhi.LoginSignUp.features.authentication.utils.JsonWebToken;
import jakarta.el.MethodNotFoundException;
import jakarta.mail.MessagingException;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.config.ConfigDataResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;
import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class AuthService {

    private static final Logger logger = LoggerFactory.getLogger(AuthService.class);

    @Autowired
    private JsonWebToken jsonWebToken;

    private final int durationInMinutes = 5;

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private Encoder encoder;

    @Autowired
    private EmailService emailService;

    @PersistenceContext
    private EntityManager entityManager;

    // Fetch user by email (for AuthFilter)
//    public AuthUser getUser(String email) {
//        return userRepo.findByEmail(email)
//                .orElseThrow(() -> new IllegalArgumentException("User not found"));
//    }
    public AuthUser getUser(String email) {
        return userRepo.findByEmail(email)
                .orElse(null);
    }

//    public UserResponseDto getUser(AuthUser user){
//        AuthUser user = userRepo.findByEmail(email).orElseThrow(() -> new IllegalArgumentException("User not found"));

//        UserResponseDto userResponseDTO = new UserResponseDto();
//        userResponseDTO.setId(user.getId());
//        userResponseDTO.setEmail(user.getEmail());
//        userResponseDTO.setFirstName(user.getFirstName());
//        userResponseDTO.setLastName(user.getLastName());
//        userResponseDTO.setRoles(user.getRoles().toString());
//
//        return userResponseDTO;
//    }


    public String register(AuthRequestBody authRequestBody) throws MessagingException, UnsupportedEncodingException {
        if(userRepo.findByEmail(authRequestBody.getEmail()).isPresent()){
            throw new IllegalArgumentException("Email Already exists");
        }

//        AuthUser user = userRepo.save(new AuthUser(authRequestBody.getEmail(), encoder.encode(authRequestBody.getPassword()), AuthUser.Role.USER ));
        AuthUser user = AuthUser.builder()
                .firstName(authRequestBody.getFirstName())
                .lastName(authRequestBody.getLastName())
                .email(authRequestBody.getEmail())
                .password(encoder.encode(authRequestBody.getPassword()))
                .state(authRequestBody.getState())
                .town(authRequestBody.getTown())
                .village(authRequestBody.getVillage())
                .mobile(authRequestBody.getMobile())
                .soilType(authRequestBody.getSoilType())
                .roles(AuthUser.Role.USER)
                .emailVerified(false)
                .build();

        String emailVerificationToken = generateEmailVerificationToken();
        String hashedToken = encoder.encode(emailVerificationToken);
        user.setEmailVerificationToken(hashedToken);
        user.setEmailVerificationTokenExpiryDate(LocalDateTime.now().plusMinutes(durationInMinutes));
        userRepo.save(user);

        String subject = "Email Verification";
        String body = String.format("""
                Only one step to take full advantage of CultivNationIndia Farmer Web-based open discussion portal.
                
                Enter this code to verify your email: %s. The code will expire in %s minutes.""",
                emailVerificationToken, durationInMinutes
                );

        try{
        emailService.sendEmail(authRequestBody.getEmail(), subject,  body);
        } catch (Exception e) {
            logger.info("Error while sending email: {}", e.getMessage());
        }
        return jsonWebToken.generateToken(authRequestBody.getEmail());
//        return new AuthResponseBody(token, "User Registered Successfully");
    }

    public String login(@Valid AuthRequestBody authRequestBody) {
            AuthUser user = userRepo.findByEmail(authRequestBody.getEmail()).orElseThrow(() -> new IllegalArgumentException("User not found"));

        String enteredPasswordHash = encoder.encode(authRequestBody.getPassword());

        if (!encoder.matches(authRequestBody.getPassword(), user.getPassword())){
                throw new IllegalArgumentException("Password is incorrect.");
            }
            if(!user.getEmailVerified()){
                throw new IllegalArgumentException("Email not verified. Please verify your email.");
            }
        return jsonWebToken.generateToken(authRequestBody.getEmail());
//            return new AuthResponseBody(token, "Authentication succeeded");
    }

    public static String generateEmailVerificationToken(){
        SecureRandom random = new SecureRandom();
        StringBuilder token = new StringBuilder(5);
        for (int i = 0; i < 5; i++) {
            token.append(random.nextInt(10));
        }
        return token.toString();
    }

    public void sendEmailVerificationToken(String email) {
        Optional<AuthUser> user = userRepo.findByEmail(email);
        if (user.isPresent() && !user.get().getEmailVerified()) {
            String emailVerificationToken = generateEmailVerificationToken();
            String hashedToken = encoder.encode(emailVerificationToken);
            user.get().setEmailVerificationToken(hashedToken);
            user.get().setEmailVerificationTokenExpiryDate(LocalDateTime.now().plusMinutes(durationInMinutes));
            userRepo.save(user.get());
            String subject = "Email Verification";
            String body = String.format("Only one step to take full advantage of Agriculture.\n\n"
                            + "Enter this code to verify your email: " + "%s\n\n" + "The code will expire in " + "%s"
                            + " minutes.",
                    emailVerificationToken, durationInMinutes);
            try {
                emailService.sendEmail(email, subject, body);
            } catch (Exception e) {
                logger.info("Error while sending email: {}", e.getMessage());
            }
        } else {
            throw new IllegalArgumentException("Email verification token failed, or email is already verified.");
        }
    }

    public void validateEmailVerificationToken(String token, String email) {
        Optional<AuthUser> user = userRepo.findByEmail(email);
        if (user.isPresent() && encoder.matches(token, user.get().getEmailVerificationToken())
                && !user.get().getEmailVerificationTokenExpiryDate().isBefore(LocalDateTime.now())) {
            user.get().setEmailVerified(true);
            user.get().setEmailVerificationToken(null);
            user.get().setEmailVerificationTokenExpiryDate(null);
            userRepo.save(user.get());
        } else if (user.isPresent() && encoder.matches(token, user.get().getEmailVerificationToken())
                && user.get().getEmailVerificationTokenExpiryDate().isBefore(LocalDateTime.now())) {
            throw new IllegalArgumentException("Email verification token expired.");
        } else {
            throw new IllegalArgumentException("Email verification token failed.");
        }
    }

    @Transactional
    public void deleteUser(Long userId){
        AuthUser user = entityManager.find(AuthUser.class, userId);
        if (user != null) {
            entityManager.createNativeQuery("DELETE FROM users WHERE id = :userId")
                    .setParameter("userId", userId)
                    .executeUpdate();
            entityManager.remove(user);
        }
    }

    public void sendPasswordResetToken(String email) {
        Optional<AuthUser> user = userRepo.findByEmail(email);
        if (user.isPresent()) {
            String passwordResetToken = generateEmailVerificationToken();
            String hashedToken = encoder.encode(passwordResetToken);
            user.get().setPasswordResetToken(hashedToken);
            user.get().setPasswordResetTokenExpiryDate(LocalDateTime.now().plusMinutes(durationInMinutes));
            userRepo.save(user.get());
            String subject = "Password Reset";
            String body = String.format("""
                            You requested a password reset.
                            
                            Enter this code to reset your password: %s. The code will expire in %s minutes.""",
                    passwordResetToken, durationInMinutes);
            try {
                emailService.sendEmail(email, subject, body);
            } catch (Exception e) {
                logger.info("Error while sending email: {}", e.getMessage());
            }
        } else {
            throw new IllegalArgumentException("User not found.");
        }
    }


    public void resetPassword(String email, String newPassword, String token) {
        Optional<AuthUser> user = userRepo.findByEmail(email);
        if (user.isPresent() && encoder.matches(token, user.get().getPasswordResetToken())
                && !user.get().getPasswordResetTokenExpiryDate().isBefore(LocalDateTime.now())) {
            user.get().setPasswordResetToken(null);
            user.get().setPasswordResetTokenExpiryDate(null);
            user.get().setPassword(encoder.encode(newPassword));
            userRepo.save(user.get());
        } else if (user.isPresent() && encoder.matches(token, user.get().getPasswordResetToken())
                && user.get().getPasswordResetTokenExpiryDate().isBefore(LocalDateTime.now())) {
            throw new IllegalArgumentException("Password reset token expired.");
        } else {
            throw new IllegalArgumentException("Password reset token failed.");
        }
    }

//    public List<AuthUser> getAllUsers() {
//        return userRepo.findAll();
//    }
//
//    public List<AuthUser> getAllAgroAgencies() {
//        return userRepo.findAll().stream()
//                .filter(user -> user.getRoles() == AuthUser.Role.AGROAGENCY)
//                .collect(Collectors.toList());
//    }

    public AuthUser updateUserProfile(Long userId, AuthUser updateUserDetails){
        return userRepo.findById(userId)
                .map(user -> {
                    user.setFirstName(updateUserDetails.getFirstName());
                    user.setLastName(updateUserDetails.getLastName());
                    user.setState(updateUserDetails.getState());
                    user.setTown(updateUserDetails.getTown());
                    user.setVillage(updateUserDetails.getVillage());
                    user.setMobile(updateUserDetails.getMobile());
                    user.setSoilType(updateUserDetails.getSoilType());
                    return userRepo.save(user);
                })
                .orElseThrow(() -> new MethodNotFoundException("User Not found with id: " + userId));
    }

    public AuthUser getUserById(Long receiverId) {
        return userRepo.findById(receiverId)
                .orElseThrow(() -> new IllegalArgumentException("User not found."));
    }

    public void assignRole(String email, AuthUser.Role role){
        AuthUser user = userRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found with email: " + email));
        userRepo.save(user);
    }

}