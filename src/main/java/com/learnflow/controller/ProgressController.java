package com.learnflow.controller;

import com.learnflow.dto.response.ApiResponse;
import com.learnflow.dto.response.ProgressResponse;
import com.learnflow.service.ProgressService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/progress")
public class ProgressController {

    private final ProgressService progressService;

    public ProgressController(ProgressService progressService) {
        this.progressService = progressService;
    }

    @GetMapping("/me")
    public ResponseEntity<ApiResponse<List<ProgressResponse>>> getUserProgress() {
        return ResponseEntity.ok(ApiResponse.ok(progressService.getUserProgress()));
    }

    @GetMapping("/course/{courseId}")
    public ResponseEntity<ApiResponse<ProgressResponse>> getCourseProgress(@PathVariable Long courseId) {
        return ResponseEntity.ok(ApiResponse.ok(progressService.getCourseProgress(courseId)));
    }
}
