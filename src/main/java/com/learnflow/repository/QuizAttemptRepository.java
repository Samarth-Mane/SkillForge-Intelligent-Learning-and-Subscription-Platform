package com.learnflow.repository;

import com.learnflow.entity.QuizAttempt;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;
import java.util.Optional;

public interface QuizAttemptRepository extends JpaRepository<QuizAttempt, Long> {
    List<QuizAttempt> findByUserIdAndQuizIdOrderByAttemptedAtDesc(Long userId, Long quizId);
    Optional<QuizAttempt> findTopByUserIdAndQuizIdOrderByScoreDesc(Long userId, Long quizId);
    long countByQuizId(Long quizId);

    @Query("SELECT AVG(qa.score) FROM QuizAttempt qa WHERE qa.quiz.id = :quizId")
    Double findAverageScoreByQuizId(@Param("quizId") Long quizId);
}
