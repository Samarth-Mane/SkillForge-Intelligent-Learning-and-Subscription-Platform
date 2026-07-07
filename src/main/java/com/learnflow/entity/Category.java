package com.learnflow.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "categories")
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String name;

    private String description;
    private String iconUrl;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;

    @OneToMany(mappedBy = "category", fetch = FetchType.LAZY)
    private List<Course> courses = new ArrayList<>();

    public Category() {}

    public Category(String name, String description) {
        this.name = name;
        this.description = description;
    }

    public Long getId() { return id; }
    public String getName() { return name; }
    public String getDescription() { return description; }
    public String getIconUrl() { return iconUrl; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public List<Course> getCourses() { return courses; }

    public void setId(Long id) { this.id = id; }
    public void setName(String name) { this.name = name; }
    public void setDescription(String description) { this.description = description; }
    public void setIconUrl(String iconUrl) { this.iconUrl = iconUrl; }
    public void setCourses(List<Course> courses) { this.courses = courses; }
}
