package com.learnflow.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "videos")
public class Video {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String youtubeUrl;

    private String duration;
    private Integer lessonOrder = 1;
    private Boolean isFree = false;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "section_id", nullable = false)
    private CourseSection section;

    @OneToMany(mappedBy = "video", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<VideoProgress> progresses = new ArrayList<>();

    public Video() {}

    public Video(String title, String youtubeUrl, String duration, Integer lessonOrder, Boolean isFree, CourseSection section) {
        this.title = title;
        this.youtubeUrl = youtubeUrl;
        this.duration = duration;
        this.lessonOrder = lessonOrder != null ? lessonOrder : 1;
        this.isFree = isFree != null && isFree;
        this.section = section;
    }

    public Long getId() { return id; }
    public String getTitle() { return title; }
    public String getYoutubeUrl() { return youtubeUrl; }
    public String getDuration() { return duration; }
    public Integer getLessonOrder() { return lessonOrder; }
    public Boolean getIsFree() { return isFree; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public CourseSection getSection() { return section; }
    public List<VideoProgress> getProgresses() { return progresses; }

    public void setId(Long id) { this.id = id; }
    public void setTitle(String title) { this.title = title; }
    public void setYoutubeUrl(String youtubeUrl) { this.youtubeUrl = youtubeUrl; }
    public void setDuration(String duration) { this.duration = duration; }
    public void setLessonOrder(Integer lessonOrder) { this.lessonOrder = lessonOrder; }
    public void setIsFree(Boolean isFree) { this.isFree = isFree; }
    public void setSection(CourseSection section) { this.section = section; }
    public void setProgresses(List<VideoProgress> progresses) { this.progresses = progresses; }
}
