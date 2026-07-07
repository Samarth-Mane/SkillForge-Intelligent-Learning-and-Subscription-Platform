package com.learnflow.repository;

import com.learnflow.entity.Subscription;
import com.learnflow.enums.SubscriptionType;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface SubscriptionRepository extends JpaRepository<Subscription, Long> {
    Optional<Subscription> findByUserId(Long userId);
    long countByPlanAndActiveTrue(SubscriptionType plan);
    long countByActiveTrue();
}
