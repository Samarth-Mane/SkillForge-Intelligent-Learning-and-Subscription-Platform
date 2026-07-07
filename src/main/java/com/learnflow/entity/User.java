package com.learnflow.entity;

import com.learnflow.enums.Role;
import com.learnflow.enums.UserStatus;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role = Role.USER;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private UserStatus status = UserStatus.ACTIVE;

    private String avatarUrl;
    private String resetPasswordToken;
    private LocalDateTime resetPasswordExpiry;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Subscription subscription;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Enrollment> enrollments = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Certificate> certificates = new ArrayList<>();

    public User() {}

    public User(String name, String email, String password, Role role, UserStatus status) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;
        this.status = status;
    }

    // Getters
    public Long getId() { return id; }
    public String getName() { return name; }
    public String getEmail() { return email; }
    public String getPassword() { return password; }
    public Role getRole() { return role; }
    public UserStatus getStatus() { return status; }
    public String getAvatarUrl() { return avatarUrl; }
    public String getResetPasswordToken() { return resetPasswordToken; }
    public LocalDateTime getResetPasswordExpiry() { return resetPasswordExpiry; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public Subscription getSubscription() { return subscription; }
    public List<Enrollment> getEnrollments() { return enrollments; }
    public List<Certificate> getCertificates() { return certificates; }

    // Setters
    public void setId(Long id) { this.id = id; }
    public void setName(String name) { this.name = name; }
    public void setEmail(String email) { this.email = email; }
    public void setPassword(String password) { this.password = password; }
    public void setRole(Role role) { this.role = role; }
    public void setStatus(UserStatus status) { this.status = status; }
    public void setAvatarUrl(String avatarUrl) { this.avatarUrl = avatarUrl; }
    public void setResetPasswordToken(String token) { this.resetPasswordToken = token; }
    public void setResetPasswordExpiry(LocalDateTime expiry) { this.resetPasswordExpiry = expiry; }
    public void setSubscription(Subscription subscription) { this.subscription = subscription; }
    public void setEnrollments(List<Enrollment> enrollments) { this.enrollments = enrollments; }
    public void setCertificates(List<Certificate> certificates) { this.certificates = certificates; }
}
