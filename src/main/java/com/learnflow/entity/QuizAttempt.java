package com.learnflow.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "quiz_attempts")
public class QuizAttempt {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "quiz_id", nullable = false)
    private Quiz quiz;

    private Integer score = 0;
    private Integer correctAnswers = 0;
    private Integer totalQuestions = 0;
    private Boolean passed = false;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime attemptedAt;

    public QuizAttempt() {}

    public QuizAttempt(User user, Quiz quiz, Integer score, Integer correctAnswers,
                       Integer totalQuestions, Boolean passed) {
        this.user = user;
        this.quiz = quiz;
        this.score = score;
        this.correctAnswers = correctAnswers;
        this.totalQuestions = totalQuestions;
        this.passed = passed;
    }

    public Long getId() { return id; }
    public User getUser() { return user; }
    public Quiz getQuiz() { return quiz; }
    public Integer getScore() { return score; }
    public Integer getCorrectAnswers() { return correctAnswers; }
    public Integer getTotalQuestions() { return totalQuestions; }
    public Boolean getPassed() { return passed; }
    public LocalDateTime getAttemptedAt() { return attemptedAt; }

    public void setId(Long id) { this.id = id; }
    public void setUser(User user) { this.user = user; }
    public void setQuiz(Quiz quiz) { this.quiz = quiz; }
    public void setScore(Integer score) { this.score = score; }
    public void setCorrectAnswers(Integer correctAnswers) { this.correctAnswers = correctAnswers; }
    public void setTotalQuestions(Integer totalQuestions) { this.totalQuestions = totalQuestions; }
    public void setPassed(Boolean passed) { this.passed = passed; }
}
