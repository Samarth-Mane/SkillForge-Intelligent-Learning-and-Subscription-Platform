package com.learnflow.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "enrollments",
       uniqueConstraints = @UniqueConstraint(columnNames = {"user_id", "course_id"}))
public class Enrollment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "course_id", nullable = false)
    private Course course;

    private Integer progressPercent = 0;
    private Boolean completed = false;
    private LocalDateTime completedAt;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime enrolledAt;

    public Enrollment() {}

    public Enrollment(User user, Course course) {
        this.user = user;
        this.course = course;
    }

    public Long getId() { return id; }
    public User getUser() { return user; }
    public Course getCourse() { return course; }
    public Integer getProgressPercent() { return progressPercent; }
    public Boolean getCompleted() { return completed; }
    public LocalDateTime getCompletedAt() { return completedAt; }
    public LocalDateTime getEnrolledAt() { return enrolledAt; }

    public void setId(Long id) { this.id = id; }
    public void setUser(User user) { this.user = user; }
    public void setCourse(Course course) { this.course = course; }
    public void setProgressPercent(Integer progressPercent) { this.progressPercent = progressPercent; }
    public void setCompleted(Boolean completed) { this.completed = completed; }
    public void setCompletedAt(LocalDateTime completedAt) { this.completedAt = completedAt; }
}
