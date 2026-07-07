package com.learnflow.dto.response;

import java.util.List;

public class ProgressResponse {
    private Long courseId;
    private String courseTitle;
    private Integer progressPercent;
    private Long completedLessons;
    private Long totalLessons;
    private List<Long> completedLessonIds;
    private Boolean completed;

    public ProgressResponse() {}

    public Long getCourseId() { return courseId; }
    public String getCourseTitle() { return courseTitle; }
    public Integer getProgressPercent() { return progressPercent; }
    public Long getCompletedLessons() { return completedLessons; }
    public Long getTotalLessons() { return totalLessons; }
    public List<Long> getCompletedLessonIds() { return completedLessonIds; }
    public Boolean getCompleted() { return completed; }
    public void setCourseId(Long courseId) { this.courseId = courseId; }
    public void setCourseTitle(String courseTitle) { this.courseTitle = courseTitle; }
    public void setProgressPercent(Integer progressPercent) { this.progressPercent = progressPercent; }
    public void setCompletedLessons(Long completedLessons) { this.completedLessons = completedLessons; }
    public void setTotalLessons(Long totalLessons) { this.totalLessons = totalLessons; }
    public void setCompletedLessonIds(List<Long> completedLessonIds) { this.completedLessonIds = completedLessonIds; }
    public void setCompleted(Boolean completed) { this.completed = completed; }
}
