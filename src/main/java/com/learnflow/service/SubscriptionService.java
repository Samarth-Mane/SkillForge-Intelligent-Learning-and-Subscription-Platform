package com.learnflow.service;

import com.learnflow.dto.response.SubscriptionResponse;
import com.learnflow.entity.Subscription;
import com.learnflow.entity.User;
import com.learnflow.enums.SubscriptionType;
import com.learnflow.exception.ResourceNotFoundException;
import com.learnflow.repository.SubscriptionRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Service
public class SubscriptionService {

    private final SubscriptionRepository subscriptionRepository;
    private final AuthService authService;

    public SubscriptionService(SubscriptionRepository subscriptionRepository, AuthService authService) {
        this.subscriptionRepository = subscriptionRepository;
        this.authService = authService;
    }

    public SubscriptionResponse getCurrentSubscription() {
        Long userId = authService.getCurrentUserId();
        Subscription sub = subscriptionRepository.findByUserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Subscription not found"));
        return toResponse(sub);
    }

    @Transactional
    public SubscriptionResponse subscribe(String planId) {
        SubscriptionType plan;
        try {
            plan = SubscriptionType.valueOf(planId.toUpperCase());
        } catch (Exception e) {
            throw new IllegalArgumentException("Invalid plan: " + planId);
        }

        Long userId = authService.getCurrentUserId();
        Subscription sub = subscriptionRepository.findByUserId(userId).orElseGet(() -> {
            User user = authService.getCurrentUser();
            return new Subscription(user, SubscriptionType.FREE);
        });

        sub.setPlan(plan);
        sub.setActive(true);
        sub.setUpdatedAt(LocalDateTime.now());
        if (plan != SubscriptionType.FREE) {
            sub.setExpiresAt(LocalDateTime.now().plusMonths(1));
        } else {
            sub.setExpiresAt(null);
        }

        return toResponse(subscriptionRepository.save(sub));
    }

    public List<Map<String, Object>> getPlans() {
        return List.of(
            Map.of("id", "FREE",    "name", "Free",    "price", 0,  "description", "Start learning for free"),
            Map.of("id", "PLUS",    "name", "Plus",    "price", 29, "description", "Professional learning"),
            Map.of("id", "PREMIUM", "name", "Premium", "price", 59, "description", "Complete career transformation")
        );
    }

    private SubscriptionResponse toResponse(Subscription s) {
        SubscriptionResponse r = new SubscriptionResponse();
        r.setId(s.getId());
        r.setPlan(s.getPlan());
        r.setActive(s.getActive());
        r.setExpiresAt(s.getExpiresAt());
        r.setCreatedAt(s.getCreatedAt());
        return r;
    }
}
