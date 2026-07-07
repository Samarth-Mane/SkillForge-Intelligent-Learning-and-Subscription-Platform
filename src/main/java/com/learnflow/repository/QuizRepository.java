package com.learnflow.repository;

import com.learnflow.entity.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface QuizRepository extends JpaRepository<Quiz, Long> {
    Optional<Quiz> findByCourseId(Long courseId);
    boolean existsByCourseId(Long courseId);
}
