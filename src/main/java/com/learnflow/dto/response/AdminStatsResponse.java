package com.learnflow.dto.response;

import java.util.List;
import java.util.Map;

public class AdminStatsResponse {
    private Long totalUsers;
    private Long totalCourses;
    private Long activeSubscriptions;
    private Long certificatesIssued;
    private Integer completionRate;
    private Long monthlyRevenue;
    private List<Map<String, Object>> recentUsers;
    private List<Map<String, Object>> topCourses;

    public AdminStatsResponse() {}

    public Long getTotalUsers() { return totalUsers; }
    public Long getTotalCourses() { return totalCourses; }
    public Long getActiveSubscriptions() { return activeSubscriptions; }
    public Long getCertificatesIssued() { return certificatesIssued; }
    public Integer getCompletionRate() { return completionRate; }
    public Long getMonthlyRevenue() { return monthlyRevenue; }
    public List<Map<String, Object>> getRecentUsers() { return recentUsers; }
    public List<Map<String, Object>> getTopCourses() { return topCourses; }
    public void setTotalUsers(Long totalUsers) { this.totalUsers = totalUsers; }
    public void setTotalCourses(Long totalCourses) { this.totalCourses = totalCourses; }
    public void setActiveSubscriptions(Long activeSubscriptions) { this.activeSubscriptions = activeSubscriptions; }
    public void setCertificatesIssued(Long certificatesIssued) { this.certificatesIssued = certificatesIssued; }
    public void setCompletionRate(Integer completionRate) { this.completionRate = completionRate; }
    public void setMonthlyRevenue(Long monthlyRevenue) { this.monthlyRevenue = monthlyRevenue; }
    public void setRecentUsers(List<Map<String, Object>> recentUsers) { this.recentUsers = recentUsers; }
    public void setTopCourses(List<Map<String, Object>> topCourses) { this.topCourses = topCourses; }
}
