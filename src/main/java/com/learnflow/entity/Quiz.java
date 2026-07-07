package com.learnflow.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "quizzes")
public class Quiz {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    private Integer timeLimit = 600;
    private Integer passMark = 70;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "course_id", nullable = false, unique = true)
    private Course course;

    @OneToMany(mappedBy = "quiz", cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
    private List<Question> questions = new ArrayList<>();

    @OneToMany(mappedBy = "quiz", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<QuizAttempt> attempts = new ArrayList<>();

    public Quiz() {}

    public Quiz(String title, Integer timeLimit, Integer passMark, Course course) {
        this.title = title;
        this.timeLimit = timeLimit != null ? timeLimit : 600;
        this.passMark = passMark != null ? passMark : 70;
        this.course = course;
    }

    public Long getId() { return id; }
    public String getTitle() { return title; }
    public Integer getTimeLimit() { return timeLimit; }
    public Integer getPassMark() { return passMark; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public Course getCourse() { return course; }
    public List<Question> getQuestions() { return questions; }
    public List<QuizAttempt> getAttempts() { return attempts; }

    public void setId(Long id) { this.id = id; }
    public void setTitle(String title) { this.title = title; }
    public void setTimeLimit(Integer timeLimit) { this.timeLimit = timeLimit; }
    public void setPassMark(Integer passMark) { this.passMark = passMark; }
    public void setCourse(Course course) { this.course = course; }
    public void setQuestions(List<Question> questions) { this.questions = questions; }
    public void setAttempts(List<QuizAttempt> attempts) { this.attempts = attempts; }
}
