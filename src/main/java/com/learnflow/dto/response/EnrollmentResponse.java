package com.learnflow.dto.response;

import java.time.LocalDateTime;

public class EnrollmentResponse {
    private Long id;
    private Long courseId;
    private String title;
    private String category;
    private String instructor;
    private String thumbnailUrl;
    private Integer progress;
    private Boolean completed;
    private String subscriptionType;
    private LocalDateTime enrolledAt;

    public EnrollmentResponse() {}

    public Long getId() { return id; }
    public Long getCourseId() { return courseId; }
    public String getTitle() { return title; }
    public String getCategory() { return category; }
    public String getInstructor() { return instructor; }
    public String getThumbnailUrl() { return thumbnailUrl; }
    public Integer getProgress() { return progress; }
    public Boolean getCompleted() { return completed; }
    public String getSubscriptionType() { return subscriptionType; }
    public LocalDateTime getEnrolledAt() { return enrolledAt; }
    public void setId(Long id) { this.id = id; }
    public void setCourseId(Long courseId) { this.courseId = courseId; }
    public void setTitle(String title) { this.title = title; }
    public void setCategory(String category) { this.category = category; }
    public void setInstructor(String instructor) { this.instructor = instructor; }
    public void setThumbnailUrl(String thumbnailUrl) { this.thumbnailUrl = thumbnailUrl; }
    public void setProgress(Integer progress) { this.progress = progress; }
    public void setCompleted(Boolean completed) { this.completed = completed; }
    public void setSubscriptionType(String subscriptionType) { this.subscriptionType = subscriptionType; }
    public void setEnrolledAt(LocalDateTime enrolledAt) { this.enrolledAt = enrolledAt; }
}
