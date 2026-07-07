package com.learnflow.controller;

import com.learnflow.dto.response.ApiResponse;
import com.learnflow.dto.response.QuizResponse;
import com.learnflow.dto.response.QuizResultResponse;
import com.learnflow.service.QuizService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
public class QuizController {

    private final QuizService quizService;

    public QuizController(QuizService quizService) {
        this.quizService = quizService;
    }

    @GetMapping("/courses/{courseId}/quiz")
    public ResponseEntity<ApiResponse<QuizResponse>> getQuizByCourse(@PathVariable Long courseId) {
        return ResponseEntity.ok(ApiResponse.ok(quizService.getQuizByCourse(courseId)));
    }

    @PostMapping("/quiz/{quizId}/submit")
    public ResponseEntity<ApiResponse<QuizResultResponse>> submitQuiz(
            @PathVariable Long quizId,
            @RequestBody Map<String, Object> body) {
        @SuppressWarnings("unchecked")
        Map<Long, Integer> answers = (Map<Long, Integer>) body.get("answers");
        return ResponseEntity.ok(ApiResponse.ok(quizService.submitQuiz(quizId, answers)));
    }

    @GetMapping("/quiz/{quizId}/result")
    public ResponseEntity<ApiResponse<QuizResultResponse>> getBestResult(@PathVariable Long quizId) {
        return ResponseEntity.ok(ApiResponse.ok(quizService.getBestResult(quizId)));
    }
}
