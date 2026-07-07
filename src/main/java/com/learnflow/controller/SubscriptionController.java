package com.learnflow.controller;

import com.learnflow.dto.response.ApiResponse;
import com.learnflow.dto.response.SubscriptionResponse;
import com.learnflow.service.SubscriptionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/subscriptions")
public class SubscriptionController {

    private final SubscriptionService subscriptionService;

    public SubscriptionController(SubscriptionService subscriptionService) {
        this.subscriptionService = subscriptionService;
    }

    @GetMapping("/plans")
    public ResponseEntity<ApiResponse<List<Map<String, Object>>>> getPlans() {
        return ResponseEntity.ok(ApiResponse.ok(subscriptionService.getPlans()));
    }

    @GetMapping("/current")
    public ResponseEntity<ApiResponse<SubscriptionResponse>> getCurrent() {
        return ResponseEntity.ok(ApiResponse.ok(subscriptionService.getCurrentSubscription()));
    }

    @PostMapping("/subscribe")
    public ResponseEntity<ApiResponse<SubscriptionResponse>> subscribe(@RequestBody Map<String, String> body) {
        return ResponseEntity.ok(ApiResponse.ok("Subscription updated",
                subscriptionService.subscribe(body.get("planId"))));
    }
}
