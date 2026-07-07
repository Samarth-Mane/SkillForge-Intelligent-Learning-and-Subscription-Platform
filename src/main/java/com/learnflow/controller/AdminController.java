package com.learnflow.controller;

import com.learnflow.dto.request.CourseRequest;
import com.learnflow.dto.response.*;
import com.learnflow.entity.Category;
import com.learnflow.entity.Video;
import com.learnflow.service.*;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/admin")
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    private final AdminService adminService;
    private final CourseService courseService;
    private final CategoryService categoryService;

    public AdminController(AdminService adminService,
                           CourseService courseService,
                           CategoryService categoryService) {
        this.adminService = adminService;
        this.courseService = courseService;
        this.categoryService = categoryService;
    }

    // ── Dashboard ────────────────────────────────────────────────
    @GetMapping("/stats")
    public ResponseEntity<ApiResponse<AdminStatsResponse>> getStats() {
        return ResponseEntity.ok(ApiResponse.ok(adminService.getDashboardStats()));
    }

    // ── Users ────────────────────────────────────────────────────
    @GetMapping("/users")
    public ResponseEntity<PageResponse<UserResponse>> getUsers(
            @RequestParam(required = false) String search,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        return ResponseEntity.ok(adminService.getUsers(search, page, size));
    }

    @PutMapping("/users/{id}")
    public ResponseEntity<ApiResponse<Void>> updateUserStatus(
            @PathVariable Long id, @RequestBody Map<String, String> body) {
        adminService.updateUserStatus(id, body.get("status"));
        return ResponseEntity.ok(ApiResponse.ok("User updated", null));
    }

    // ── Courses ──────────────────────────────────────────────────
    @PostMapping("/courses")
    public ResponseEntity<ApiResponse<CourseResponse>> createCourse(
            @Valid @RequestBody CourseRequest.Create request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.ok("Course created", courseService.createCourse(request)));
    }

    @PutMapping("/courses/{id}")
    public ResponseEntity<ApiResponse<CourseResponse>> updateCourse(
            @PathVariable Long id, @RequestBody CourseRequest.Update request) {
        return ResponseEntity.ok(ApiResponse.ok("Course updated", courseService.updateCourse(id, request)));
    }

    @DeleteMapping("/courses/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteCourse(@PathVariable Long id) {
        courseService.deleteCourse(id);
        return ResponseEntity.ok(ApiResponse.ok("Course deleted", null));
    }

    // ── Videos ───────────────────────────────────────────────────
    @PostMapping("/courses/{courseId}/videos")
    public ResponseEntity<ApiResponse<Map<String, Object>>> createVideo(
            @PathVariable Long courseId, @RequestBody Map<String, Object> body) {
        Long sectionId = body.get("sectionId") != null
                ? Long.valueOf(body.get("sectionId").toString()) : null;
        Integer lessonOrder = body.get("lessonOrder") != null
                ? (Integer) body.get("lessonOrder") : 1;
        Boolean isFree = body.get("isFree") != null && (Boolean) body.get("isFree");

        Video video = adminService.createVideo(courseId,
                (String) body.get("title"),
                (String) body.get("youtubeUrl"),
                (String) body.get("duration"),
                lessonOrder, isFree, sectionId);

        Map<String, Object> result = Map.of(
                "id", video.getId(),
                "title", video.getTitle(),
                "url", video.getYoutubeUrl(),
                "duration", video.getDuration() != null ? video.getDuration() : ""
        );
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.ok("Video added", result));
    }

    @PutMapping("/videos/{id}")
    public ResponseEntity<ApiResponse<Void>> updateVideo(
            @PathVariable Long id, @RequestBody Map<String, Object> body) {
        adminService.updateVideo(id,
                (String) body.get("title"),
                (String) body.get("youtubeUrl"),
                (String) body.get("duration"),
                body.get("lessonOrder") != null ? (Integer) body.get("lessonOrder") : null,
                body.get("isFree") != null ? (Boolean) body.get("isFree") : null);
        return ResponseEntity.ok(ApiResponse.ok("Video updated", null));
    }

    @DeleteMapping("/videos/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteVideo(@PathVariable Long id) {
        adminService.deleteVideo(id);
        return ResponseEntity.ok(ApiResponse.ok("Video deleted", null));
    }

    // ── Quizzes ──────────────────────────────────────────────────
    @GetMapping("/quizzes")
    public ResponseEntity<ApiResponse<List<QuizResponse>>> getQuizzes() {
        return ResponseEntity.ok(ApiResponse.ok(adminService.getAllQuizzes()));
    }

    @PostMapping("/courses/{courseId}/quiz")
    public ResponseEntity<ApiResponse<QuizResponse>> createQuiz(
            @PathVariable Long courseId, @RequestBody Map<String, Object> body) {
        @SuppressWarnings("unchecked")
        List<Map<String, Object>> questions = (List<Map<String, Object>>) body.get("questions");
        Integer timeLimit = body.get("timeLimit") != null ? (Integer) body.get("timeLimit") : 600;
        Integer passMark  = body.get("passMark")  != null ? (Integer) body.get("passMark")  : 70;
        QuizResponse quiz = adminService.createQuiz(
                courseId, (String) body.get("title"), timeLimit, passMark, questions);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.ok("Quiz created", quiz));
    }

    @DeleteMapping("/quizzes/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteQuiz(@PathVariable Long id) {
        adminService.deleteQuiz(id);
        return ResponseEntity.ok(ApiResponse.ok("Quiz deleted", null));
    }

    // ── Categories ───────────────────────────────────────────────
    @PostMapping("/categories")
    public ResponseEntity<ApiResponse<Category>> createCategory(@RequestBody Map<String, String> body) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.ok("Category created",
                        categoryService.createCategory(body.get("name"), body.get("description"))));
    }

    @PutMapping("/categories/{id}")
    public ResponseEntity<ApiResponse<Category>> updateCategory(
            @PathVariable Long id, @RequestBody Map<String, String> body) {
        return ResponseEntity.ok(ApiResponse.ok(
                categoryService.updateCategory(id, body.get("name"), body.get("description"))));
    }

    @DeleteMapping("/categories/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteCategory(@PathVariable Long id) {
        categoryService.deleteCategory(id);
        return ResponseEntity.ok(ApiResponse.ok("Category deleted", null));
    }
}
