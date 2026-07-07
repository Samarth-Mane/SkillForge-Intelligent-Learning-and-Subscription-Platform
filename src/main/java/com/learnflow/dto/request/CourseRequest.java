package com.learnflow.dto.request;

import com.learnflow.enums.DifficultyLevel;
import com.learnflow.enums.SubscriptionType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class CourseRequest {

    public static class Create {
        @NotBlank private String title;
        private String description;
        @NotBlank private String instructor;
        private String instructorBio;
        private String instructorAvatar;
        private String thumbnailUrl;
        private String duration;
        private String language;
        @NotNull private Long categoryId;
        @NotNull private SubscriptionType subscriptionType;
        @NotNull private DifficultyLevel difficulty;
        private Boolean featured = false;

        public Create() {}
        public String getTitle() { return title; }
        public String getDescription() { return description; }
        public String getInstructor() { return instructor; }
        public String getInstructorBio() { return instructorBio; }
        public String getInstructorAvatar() { return instructorAvatar; }
        public String getThumbnailUrl() { return thumbnailUrl; }
        public String getDuration() { return duration; }
        public String getLanguage() { return language; }
        public Long getCategoryId() { return categoryId; }
        public SubscriptionType getSubscriptionType() { return subscriptionType; }
        public DifficultyLevel getDifficulty() { return difficulty; }
        public Boolean getFeatured() { return featured; }
        public void setTitle(String title) { this.title = title; }
        public void setDescription(String description) { this.description = description; }
        public void setInstructor(String instructor) { this.instructor = instructor; }
        public void setInstructorBio(String instructorBio) { this.instructorBio = instructorBio; }
        public void setInstructorAvatar(String instructorAvatar) { this.instructorAvatar = instructorAvatar; }
        public void setThumbnailUrl(String thumbnailUrl) { this.thumbnailUrl = thumbnailUrl; }
        public void setDuration(String duration) { this.duration = duration; }
        public void setLanguage(String language) { this.language = language; }
        public void setCategoryId(Long categoryId) { this.categoryId = categoryId; }
        public void setSubscriptionType(SubscriptionType subscriptionType) { this.subscriptionType = subscriptionType; }
        public void setDifficulty(DifficultyLevel difficulty) { this.difficulty = difficulty; }
        public void setFeatured(Boolean featured) { this.featured = featured; }
    }

    public static class Update {
        private String title;
        private String description;
        private String instructor;
        private String instructorBio;
        private String instructorAvatar;
        private String thumbnailUrl;
        private String duration;
        private String language;
        private Long categoryId;
        private SubscriptionType subscriptionType;
        private DifficultyLevel difficulty;
        private Boolean featured;
        private String status;

        public Update() {}
        public String getTitle() { return title; }
        public String getDescription() { return description; }
        public String getInstructor() { return instructor; }
        public String getInstructorBio() { return instructorBio; }
        public String getInstructorAvatar() { return instructorAvatar; }
        public String getThumbnailUrl() { return thumbnailUrl; }
        public String getDuration() { return duration; }
        public String getLanguage() { return language; }
        public Long getCategoryId() { return categoryId; }
        public SubscriptionType getSubscriptionType() { return subscriptionType; }
        public DifficultyLevel getDifficulty() { return difficulty; }
        public Boolean getFeatured() { return featured; }
        public String getStatus() { return status; }
        public void setTitle(String t) { this.title = t; }
        public void setDescription(String d) { this.description = d; }
        public void setInstructor(String i) { this.instructor = i; }
        public void setInstructorBio(String b) { this.instructorBio = b; }
        public void setInstructorAvatar(String a) { this.instructorAvatar = a; }
        public void setThumbnailUrl(String u) { this.thumbnailUrl = u; }
        public void setDuration(String d) { this.duration = d; }
        public void setLanguage(String l) { this.language = l; }
        public void setCategoryId(Long c) { this.categoryId = c; }
        public void setSubscriptionType(SubscriptionType s) { this.subscriptionType = s; }
        public void setDifficulty(DifficultyLevel d) { this.difficulty = d; }
        public void setFeatured(Boolean f) { this.featured = f; }
        public void setStatus(String s) { this.status = s; }
    }
}
