package com.learnflow.entity;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "questions")
public class Question {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String text;

    private Integer correctOption = 0;
    private Integer questionOrder = 1;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "quiz_id", nullable = false)
    private Quiz quiz;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "question_options", joinColumns = @JoinColumn(name = "question_id"))
    @OrderColumn(name = "option_order")
    @Column(name = "option_text", columnDefinition = "TEXT")
    private List<String> options = new ArrayList<>();

    public Question() {}

    public Question(String text, Integer correctOption, Integer questionOrder, Quiz quiz, List<String> options) {
        this.text = text;
        this.correctOption = correctOption;
        this.questionOrder = questionOrder;
        this.quiz = quiz;
        this.options = options != null ? options : new ArrayList<>();
    }

    public Long getId() { return id; }
    public String getText() { return text; }
    public Integer getCorrectOption() { return correctOption; }
    public Integer getQuestionOrder() { return questionOrder; }
    public Quiz getQuiz() { return quiz; }
    public List<String> getOptions() { return options; }

    public void setId(Long id) { this.id = id; }
    public void setText(String text) { this.text = text; }
    public void setCorrectOption(Integer correctOption) { this.correctOption = correctOption; }
    public void setQuestionOrder(Integer questionOrder) { this.questionOrder = questionOrder; }
    public void setQuiz(Quiz quiz) { this.quiz = quiz; }
    public void setOptions(List<String> options) { this.options = options; }
}
