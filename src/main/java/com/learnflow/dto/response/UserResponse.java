package com.learnflow.dto.response;

import com.learnflow.enums.Role;
import com.learnflow.enums.UserStatus;
import java.time.LocalDateTime;

public class UserResponse {
    private Long id;
    private String name;
    private String email;
    private Role role;
    private UserStatus status;
    private String avatarUrl;
    private LocalDateTime createdAt;
    private String plan;
    private Integer coursesEnrolled;

    public UserResponse() {}

    public Long getId() { return id; }
    public String getName() { return name; }
    public String getEmail() { return email; }
    public Role getRole() { return role; }
    public UserStatus getStatus() { return status; }
    public String getAvatarUrl() { return avatarUrl; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public String getPlan() { return plan; }
    public Integer getCoursesEnrolled() { return coursesEnrolled; }

    public void setId(Long id) { this.id = id; }
    public void setName(String name) { this.name = name; }
    public void setEmail(String email) { this.email = email; }
    public void setRole(Role role) { this.role = role; }
    public void setStatus(UserStatus status) { this.status = status; }
    public void setAvatarUrl(String avatarUrl) { this.avatarUrl = avatarUrl; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    public void setPlan(String plan) { this.plan = plan; }
    public void setCoursesEnrolled(Integer coursesEnrolled) { this.coursesEnrolled = coursesEnrolled; }
}
