package com.learnflow.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "video_progress",
       uniqueConstraints = @UniqueConstraint(columnNames = {"user_id", "video_id"}))
public class VideoProgress {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "video_id", nullable = false)
    private Video video;

    private Boolean completed = false;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime completedAt;

    public VideoProgress() {}

    public VideoProgress(User user, Video video) {
        this.user = user;
        this.video = video;
        this.completed = true;
    }

    public Long getId() { return id; }
    public User getUser() { return user; }
    public Video getVideo() { return video; }
    public Boolean getCompleted() { return completed; }
    public LocalDateTime getCompletedAt() { return completedAt; }

    public void setId(Long id) { this.id = id; }
    public void setUser(User user) { this.user = user; }
    public void setVideo(Video video) { this.video = video; }
    public void setCompleted(Boolean completed) { this.completed = completed; }
}
