package com.learnflow.entity;

import com.learnflow.enums.CourseStatus;
import com.learnflow.enums.DifficultyLevel;
import com.learnflow.enums.SubscriptionType;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "courses")
public class Course {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(nullable = false)
    private String instructor;

    private String instructorBio;
    private String instructorAvatar;
    private String thumbnailUrl;
    private String duration;
    private String language;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private SubscriptionType subscriptionType = SubscriptionType.FREE;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private DifficultyLevel difficulty = DifficultyLevel.Beginner;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private CourseStatus status = CourseStatus.DRAFT;

    private Double rating = 0.0;
    private Integer studentsCount = 0;
    private Boolean featured = false;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private Category category;

    @OneToMany(mappedBy = "course", cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
    @OrderBy("sectionOrder ASC")
    private List<CourseSection> sections = new ArrayList<>();

    @OneToMany(mappedBy = "course", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Enrollment> enrollments = new ArrayList<>();

    @OneToOne(mappedBy = "course", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Quiz quiz;

    public Course() {}

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
    public LocalDateTime getCreatedAt() { return createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public Category getCategory() { return category; }
    public List<CourseSection> getSections() { return sections; }
    public List<Enrollment> getEnrollments() { return enrollments; }
    public Quiz getQuiz() { return quiz; }

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
    public void setCategory(Category category) { this.category = category; }
    public void setSections(List<CourseSection> sections) { this.sections = sections; }
    public void setEnrollments(List<Enrollment> enrollments) { this.enrollments = enrollments; }
    public void setQuiz(Quiz quiz) { this.quiz = quiz; }
}
