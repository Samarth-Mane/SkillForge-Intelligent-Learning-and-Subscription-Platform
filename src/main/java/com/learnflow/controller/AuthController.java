package com.learnflow.controller;

import com.learnflow.dto.request.AuthRequest;
import com.learnflow.dto.response.ApiResponse;
import com.learnflow.dto.response.AuthResponse;
import com.learnflow.dto.response.UserResponse;
import com.learnflow.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<AuthResponse>> register(
            @Valid @RequestBody AuthRequest.Register request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.ok("Account created successfully", authService.register(request)));
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<AuthResponse>> login(
            @Valid @RequestBody AuthRequest.Login request) {
        return ResponseEntity.ok(ApiResponse.ok("Login successful", authService.login(request)));
    }

    @GetMapping("/me")
    public ResponseEntity<ApiResponse<UserResponse>> getProfile() {
        return ResponseEntity.ok(ApiResponse.ok(authService.getProfile()));
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<ApiResponse<Void>> forgotPassword(
            @Valid @RequestBody AuthRequest.ForgotPassword request) {
        authService.forgotPassword(request);
        return ResponseEntity.ok(ApiResponse.ok("Password reset email sent", null));
    }

    @PostMapping("/reset-password")
    public ResponseEntity<ApiResponse<Void>> resetPassword(
            @Valid @RequestBody AuthRequest.ResetPassword request) {
        authService.resetPassword(request);
        return ResponseEntity.ok(ApiResponse.ok("Password reset successfully", null));
    }
}
