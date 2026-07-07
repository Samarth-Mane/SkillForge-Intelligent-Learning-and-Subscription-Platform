package com.learnflow.dto.response;

import java.time.LocalDateTime;

public class QuizResultResponse {
    private Integer score;
    private Integer correct;
    private Integer total;
    private Boolean passed;
    private LocalDateTime attemptedAt;

    public QuizResultResponse() {}
    public QuizResultResponse(Integer score, Integer correct, Integer total, Boolean passed, LocalDateTime attemptedAt) {
        this.score = score; this.correct = correct; this.total = total;
        this.passed = passed; this.attemptedAt = attemptedAt;
    }

    public Integer getScore() { return score; }
    public Integer getCorrect() { return correct; }
    public Integer getTotal() { return total; }
    public Boolean getPassed() { return passed; }
    public LocalDateTime getAttemptedAt() { return attemptedAt; }
    public void setScore(Integer score) { this.score = score; }
    public void setCorrect(Integer correct) { this.correct = correct; }
    public void setTotal(Integer total) { this.total = total; }
    public void setPassed(Boolean passed) { this.passed = passed; }
    public void setAttemptedAt(LocalDateTime attemptedAt) { this.attemptedAt = attemptedAt; }
}
