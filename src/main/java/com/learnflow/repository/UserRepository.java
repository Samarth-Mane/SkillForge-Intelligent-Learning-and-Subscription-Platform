package com.learnflow.repository;

import com.learnflow.entity.User;
import com.learnflow.enums.UserStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    boolean existsByEmail(String email);
    Optional<User> findByResetPasswordToken(String token);
    long countByStatus(UserStatus status);

    @Query("SELECT u FROM User u WHERE :search IS NULL OR LOWER(u.name) LIKE LOWER(CONCAT('%',:search,'%')) OR LOWER(u.email) LIKE LOWER(CONCAT('%',:search,'%'))")
    Page<User> searchUsers(@Param("search") String search, Pageable pageable);
}
