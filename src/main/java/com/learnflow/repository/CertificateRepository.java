package com.learnflow.repository;

import com.learnflow.entity.Certificate;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface CertificateRepository extends JpaRepository<Certificate, Long> {
    List<Certificate> findByUserIdOrderByIssuedAtDesc(Long userId);
    Optional<Certificate> findByUserIdAndCourseId(Long userId, Long courseId);
    Optional<Certificate> findByCertificateId(String certificateId);
    boolean existsByUserIdAndCourseId(Long userId, Long courseId);
}
