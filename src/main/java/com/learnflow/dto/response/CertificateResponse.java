package com.learnflow.dto.response;

import java.time.LocalDateTime;

public class CertificateResponse {
    private Long id;
    private String certificateId;
    private String studentName;
    private String courseName;
    private String instructorName;
    private String courseHours;
    private LocalDateTime issuedAt;

    public CertificateResponse() {}

    public Long getId() { return id; }
    public String getCertificateId() { return certificateId; }
    public String getStudentName() { return studentName; }
    public String getCourseName() { return courseName; }
    public String getInstructorName() { return instructorName; }
    public String getCourseHours() { return courseHours; }
    public LocalDateTime getIssuedAt() { return issuedAt; }
    public void setId(Long id) { this.id = id; }
    public void setCertificateId(String certificateId) { this.certificateId = certificateId; }
    public void setStudentName(String studentName) { this.studentName = studentName; }
    public void setCourseName(String courseName) { this.courseName = courseName; }
    public void setInstructorName(String instructorName) { this.instructorName = instructorName; }
    public void setCourseHours(String courseHours) { this.courseHours = courseHours; }
    public void setIssuedAt(LocalDateTime issuedAt) { this.issuedAt = issuedAt; }
}
