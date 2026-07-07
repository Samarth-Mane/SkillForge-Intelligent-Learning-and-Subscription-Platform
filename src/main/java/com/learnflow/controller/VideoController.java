package com.learnflow.controller;

import com.learnflow.dto.response.ApiResponse;
import com.learnflow.service.ProgressService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/videos")
public class VideoController {

    private final ProgressService progressService;

    public VideoController(ProgressService progressService) {
        this.progressService = progressService;
    }

    @PostMapping("/{videoId}/complete")
    public ResponseEntity<ApiResponse<Void>> markComplete(@PathVariable Long videoId) {
        progressService.markVideoComplete(videoId);
        return ResponseEntity.ok(ApiResponse.ok("Lesson marked as complete", null));
    }
}
