package com.learnflow.entity;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "course_sections")
public class CourseSection {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    private Integer sectionOrder = 1;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "course_id", nullable = false)
    private Course course;

    @OneToMany(mappedBy = "section", cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
    @OrderBy("lessonOrder ASC")
    private List<Video> videos = new ArrayList<>();

    public CourseSection() {}

    public CourseSection(String title, Integer sectionOrder, Course course) {
        this.title = title;
        this.sectionOrder = sectionOrder;
        this.course = course;
    }

    public Long getId() { return id; }
    public String getTitle() { return title; }
    public Integer getSectionOrder() { return sectionOrder; }
    public Course getCourse() { return course; }
    public List<Video> getVideos() { return videos; }

    public void setId(Long id) { this.id = id; }
    public void setTitle(String title) { this.title = title; }
    public void setSectionOrder(Integer sectionOrder) { this.sectionOrder = sectionOrder; }
    public void setCourse(Course course) { this.course = course; }
    public void setVideos(List<Video> videos) { this.videos = videos; }
}
