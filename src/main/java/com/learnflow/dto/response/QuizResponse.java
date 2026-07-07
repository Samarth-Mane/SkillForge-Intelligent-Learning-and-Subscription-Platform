package com.learnflow.dto.response;

import java.util.List;

public class QuizResponse {
    private Long id;
    private String title;
    private Integer timeLimit;
    private Integer passMark;
    private Long courseId;
    private String courseName;
    private List<QuestionData> questions;
    private Long totalAttempts;
    private Double avgScore;

    public QuizResponse() {}

    public Long getId() { return id; }
    public String getTitle() { return title; }
    public Integer getTimeLimit() { return timeLimit; }
    public Integer getPassMark() { return passMark; }
    public Long getCourseId() { return courseId; }
    public String getCourseName() { return courseName; }
    public List<QuestionData> getQuestions() { return questions; }
    public Long getTotalAttempts() { return totalAttempts; }
    public Double getAvgScore() { return avgScore; }
    public void setId(Long id) { this.id = id; }
    public void setTitle(String title) { this.title = title; }
    public void setTimeLimit(Integer timeLimit) { this.timeLimit = timeLimit; }
    public void setPassMark(Integer passMark) { this.passMark = passMark; }
    public void setCourseId(Long courseId) { this.courseId = courseId; }
    public void setCourseName(String courseName) { this.courseName = courseName; }
    public void setQuestions(List<QuestionData> questions) { this.questions = questions; }
    public void setTotalAttempts(Long totalAttempts) { this.totalAttempts = totalAttempts; }
    public void setAvgScore(Double avgScore) { this.avgScore = avgScore; }

    public static class QuestionData {
        private Long id;
        private String text;
        private List<String> options;
        private Integer correctOption;
        private Integer questionOrder;

        public QuestionData() {}
        public Long getId() { return id; }
        public String getText() { return text; }
        public List<String> getOptions() { return options; }
        public Integer getCorrectOption() { return correctOption; }
        public Integer getQuestionOrder() { return questionOrder; }
        public void setId(Long id) { this.id = id; }
        public void setText(String text) { this.text = text; }
        public void setOptions(List<String> options) { this.options = options; }
        public void setCorrectOption(Integer correctOption) { this.correctOption = correctOption; }
        public void setQuestionOrder(Integer questionOrder) { this.questionOrder = questionOrder; }
    }
}
