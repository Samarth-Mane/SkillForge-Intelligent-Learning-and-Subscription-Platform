package com.learnflow.service;

import com.learnflow.dto.request.AuthRequest;
import com.learnflow.dto.response.AuthResponse;
import com.learnflow.dto.response.UserResponse;
import com.learnflow.entity.Subscription;
import com.learnflow.entity.User;
import com.learnflow.enums.Role;
import com.learnflow.enums.SubscriptionType;
import com.learnflow.enums.UserStatus;
import com.learnflow.exception.BadRequestException;
import com.learnflow.exception.ResourceNotFoundException;
import com.learnflow.exception.UnauthorizedException;
import com.learnflow.repository.SubscriptionRepository;
import com.learnflow.repository.UserRepository;
import com.learnflow.security.JwtUtils;
import com.learnflow.security.UserDetailsImpl;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final SubscriptionRepository subscriptionRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtUtils jwtUtils;
    private final EmailService emailService;

    public AuthService(UserRepository userRepository,
                       SubscriptionRepository subscriptionRepository,
                       PasswordEncoder passwordEncoder,
                       AuthenticationManager authenticationManager,
                       JwtUtils jwtUtils,
                       EmailService emailService) {
        this.userRepository = userRepository;
        this.subscriptionRepository = subscriptionRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtUtils = jwtUtils;
        this.emailService = emailService;
    }

    @Transactional
    public AuthResponse register(AuthRequest.Register request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new BadRequestException("Email is already registered");
        }
        User user = new User(
                request.getName(),
                request.getEmail(),
                passwordEncoder.encode(request.getPassword()),
                Role.USER,
                UserStatus.ACTIVE
        );
        user = userRepository.save(user);

        Subscription subscription = new Subscription(user, SubscriptionType.FREE);
        subscriptionRepository.save(subscription);

        emailService.sendWelcome(user.getEmail(), user.getName());

        String token = jwtUtils.generateTokenFromEmail(user.getEmail(), user.getId());
        return buildAuthResponse(token, user);
    }

    public AuthResponse login(AuthRequest.Login request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new UnauthorizedException("Invalid email or password"));

        if (user.getStatus() == UserStatus.BANNED) {
            throw new UnauthorizedException("Your account has been suspended");
        }

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String token = jwtUtils.generateToken(authentication);
        return buildAuthResponse(token, user);
    }

    @Transactional(readOnly = true)
    public UserResponse getProfile() {
        User user = getCurrentUser();
        Subscription sub = subscriptionRepository.findByUserId(user.getId()).orElse(null);

        UserResponse response = new UserResponse();
        response.setId(user.getId());
        response.setName(user.getName());
        response.setEmail(user.getEmail());
        response.setRole(user.getRole());
        response.setStatus(user.getStatus());
        response.setAvatarUrl(user.getAvatarUrl());
        response.setCreatedAt(user.getCreatedAt());
        response.setPlan(sub != null ? sub.getPlan().name() : "FREE");
        response.setCoursesEnrolled(user.getEnrollments().size());
        return response;
    }

    @Transactional
    public void forgotPassword(AuthRequest.ForgotPassword request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new ResourceNotFoundException("No account found with that email"));

        String token = UUID.randomUUID().toString();
        user.setResetPasswordToken(token);
        user.setResetPasswordExpiry(LocalDateTime.now().plusHours(1));
        userRepository.save(user);

        emailService.sendPasswordReset(user.getEmail(), user.getName(), token);
    }

    @Transactional
    public void resetPassword(AuthRequest.ResetPassword request) {
        User user = userRepository.findByResetPasswordToken(request.getToken())
                .orElseThrow(() -> new BadRequestException("Invalid or expired reset token"));

        if (user.getResetPasswordExpiry().isBefore(LocalDateTime.now())) {
            throw new BadRequestException("Reset token has expired");
        }

        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setResetPasswordToken(null);
        user.setResetPasswordExpiry(null);
        userRepository.save(user);
    }

    public User getCurrentUser() {
        UserDetailsImpl userDetails = (UserDetailsImpl)
                SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return userRepository.findById(userDetails.getId())
                .orElseThrow(() -> new ResourceNotFoundException("User", userDetails.getId()));
    }

    public Long getCurrentUserId() {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        System.out.println("==================================");

        if (authentication == null) {
            System.out.println("Authentication is NULL");
            throw new RuntimeException("Authentication is NULL");
        }

        System.out.println("Authentication = " + authentication);

        Object principal = authentication.getPrincipal();

        System.out.println("Principal Class = " + principal.getClass().getName());
        System.out.println("Principal Value = " + principal);

        System.out.println("==================================");

        UserDetailsImpl userDetails = (UserDetailsImpl) principal;

        return userDetails.getId();
    }

    private AuthResponse buildAuthResponse(String token, User user) {
        AuthResponse.UserInfo userInfo = new AuthResponse.UserInfo(
                user.getId(), user.getName(), user.getEmail(),
                user.getRole(), user.getAvatarUrl()
        );
        return new AuthResponse(token, userInfo);
    }
}
