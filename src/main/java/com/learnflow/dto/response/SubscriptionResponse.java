package com.learnflow.dto.response;

import com.learnflow.enums.SubscriptionType;
import java.time.LocalDateTime;

public class SubscriptionResponse {
    private Long id;
    private SubscriptionType plan;
    private Boolean active;
    private LocalDateTime expiresAt;
    private LocalDateTime createdAt;

    public SubscriptionResponse() {}

    public Long getId() { return id; }
    public SubscriptionType getPlan() { return plan; }
    public Boolean getActive() { return active; }
    public LocalDateTime getExpiresAt() { return expiresAt; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setId(Long id) { this.id = id; }
    public void setPlan(SubscriptionType plan) { this.plan = plan; }
    public void setActive(Boolean active) { this.active = active; }
    public void setExpiresAt(LocalDateTime expiresAt) { this.expiresAt = expiresAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
