package com.learnflow.entity;

import com.learnflow.enums.SubscriptionType;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "subscriptions")
public class Subscription {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private SubscriptionType plan = SubscriptionType.FREE;

    private Boolean active = true;
    private LocalDateTime expiresAt;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    public Subscription() {}

    public Subscription(User user, SubscriptionType plan) {
        this.user = user;
        this.plan = plan;
        this.active = true;
    }

    public Long getId() { return id; }
    public User getUser() { return user; }
    public SubscriptionType getPlan() { return plan; }
    public Boolean getActive() { return active; }
    public LocalDateTime getExpiresAt() { return expiresAt; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }

    public void setId(Long id) { this.id = id; }
    public void setUser(User user) { this.user = user; }
    public void setPlan(SubscriptionType plan) { this.plan = plan; }
    public void setActive(Boolean active) { this.active = active; }
    public void setExpiresAt(LocalDateTime expiresAt) { this.expiresAt = expiresAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}
