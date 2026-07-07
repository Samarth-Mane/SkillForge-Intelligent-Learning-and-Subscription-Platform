package com.learnflow.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "certificates")
public class Certificate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String certificateId;
    
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "course_id", nullable = false)
    private Course course;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime issuedAt;

    public Certificate() {}

    public Certificate(User user, Course course) {
        this.user = user;
        this.course = course;
    }

    public Long getId() { return id; }
    public String getCertificateId() { return certificateId; }
    public User getUser() { return user; }
    public Course getCourse() { return course; }
    public LocalDateTime getIssuedAt() { return issuedAt; }

    public void setId(Long id) { this.id = id; }
    public void setCertificateId(String certificateId) { this.certificateId = certificateId; }
    public void setUser(User user) { this.user = user; }
    public void setCourse(Course course) { this.course = course; }
}
