package com.learnflow.dto.response;

import com.learnflow.enums.CourseStatus;
import com.learnflow.enums.DifficultyLevel;
import com.learnflow.enums.SubscriptionType;

import java.time.LocalDateTime;
import java.util.List;

public class CourseResponse {
    private Long id;
    private String title;
    private String description;
    private String instructor;
    private String instructorBio;
    private String instructorAvatar;
    private String thumbnailUrl;
    private String duration;
    private String language;
    private SubscriptionType subscriptionType;
    private DifficultyLevel difficulty;
    private CourseStatus status;
    private Double rating;
    private Integer studentsCount;
    private Boolean featured;
    private String category;
    private Long categoryId;
    private List<SectionResponse> curriculum;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public CourseResponse() {}

    // Getters
    public Long getId() { return id; }
    public String getTitle() { return title; }
    public String getDescription() { return description; }
    public String getInstructor() { return instructor; }
    public String getInstructorBio() { return instructorBio; }
    public String getInstructorAvatar() { return instructorAvatar; }
    public String getThumbnailUrl() { return thumbnailUrl; }
    public String getDuration() { return duration; }
    public String getLanguage() { return language; }
    public SubscriptionType getSubscriptionType() { return subscriptionType; }
    public DifficultyLevel getDifficulty() { return difficulty; }
    public CourseStatus getStatus() { return status; }
    public Double getRating() { return rating; }
    public Integer getStudentsCount() { return studentsCount; }
    public Boolean getFeatured() { return featured; }
    public String getCategory() { return category; }
    public Long getCategoryId() { return categoryId; }
    public List<SectionResponse> getCurriculum() { return curriculum; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }

    // Setters
    public void setId(Long id) { this.id = id; }
    public void setTitle(String title) { this.title = title; }
    public void setDescription(String description) { this.description = description; }
    public void setInstructor(String instructor) { this.instructor = instructor; }
    public void setInstructorBio(String instructorBio) { this.instructorBio = instructorBio; }
    public void setInstructorAvatar(String instructorAvatar) { this.instructorAvatar = instructorAvatar; }
    public void setThumbnailUrl(String thumbnailUrl) { this.thumbnailUrl = thumbnailUrl; }
    public void setDuration(String duration) { this.duration = duration; }
    public void setLanguage(String language) { this.language = language; }
    public void setSubscriptionType(SubscriptionType subscriptionType) { this.subscriptionType = subscriptionType; }
    public void setDifficulty(DifficultyLevel difficulty) { this.difficulty = difficulty; }
    public void setStatus(CourseStatus status) { this.status = status; }
    public void setRating(Double rating) { this.rating = rating; }
    public void setStudentsCount(Integer studentsCount) { this.studentsCount = studentsCount; }
    public void setFeatured(Boolean featured) { this.featured = featured; }
    public void setCategory(String category) { this.category = category; }
    public void setCategoryId(Long categoryId) { this.categoryId = categoryId; }
    public void setCurriculum(List<SectionResponse> curriculum) { this.curriculum = curriculum; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }

    // ── Nested DTOs ───────────────────────────────────────────────
    public static class SectionResponse {
        private Long id;
        private String title;
        private Integer sectionOrder;
        private List<VideoResponse> lessons;

        public SectionResponse() {}
        public SectionResponse(Long id, String title, Integer sectionOrder, List<VideoResponse> lessons) {
            this.id = id; this.title = title;
            this.sectionOrder = sectionOrder; this.lessons = lessons;
        }

        public Long getId() { return id; }
        public String getTitle() { return title; }
        public Integer getSectionOrder() { return sectionOrder; }
        public List<VideoResponse> getLessons() { return lessons; }
        public void setId(Long id) { this.id = id; }
        public void setTitle(String title) { this.title = title; }
        public void setSectionOrder(Integer sectionOrder) { this.sectionOrder = sectionOrder; }
        public void setLessons(List<VideoResponse> lessons) { this.lessons = lessons; }
    }

    public static class VideoResponse {
        private Long id;
        private String title;
        private String url;
        private String duration;
        private Integer lessonOrder;
        private Boolean free;

        public VideoResponse() {}
        public VideoResponse(Long id, String title, String url, String duration, Integer lessonOrder, Boolean free) {
            this.id = id; this.title = title; this.url = url;
            this.duration = duration; this.lessonOrder = lessonOrder; this.free = free;
        }

        public Long getId() { return id; }
        public String getTitle() { return title; }
        public String getUrl() { return url; }
        public String getDuration() { return duration; }
        public Integer getLessonOrder() { return lessonOrder; }
        public Boolean getFree() { return free; }
        public void setId(Long id) { this.id = id; }
        public void setTitle(String title) { this.title = title; }
        public void setUrl(String url) { this.url = url; }
        public void setDuration(String duration) { this.duration = duration; }
        public void setLessonOrder(Integer lessonOrder) { this.lessonOrder = lessonOrder; }
        public void setFree(Boolean free) { this.free = free; }
    }
}
