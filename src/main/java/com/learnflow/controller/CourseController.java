package com.learnflow.controller;

import com.learnflow.dto.response.ApiResponse;
import com.learnflow.dto.response.CourseResponse;
import com.learnflow.dto.response.PageResponse;
import com.learnflow.service.CourseService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/courses")
public class CourseController {

    private final CourseService courseService;

    public CourseController(CourseService courseService) {
        this.courseService = courseService;
    }

    @GetMapping
    public ResponseEntity<PageResponse<CourseResponse>> getCourses(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) Long categoryId,
            @RequestParam(required = false) String subscription,
            @RequestParam(required = false) String difficulty,
            @RequestParam(defaultValue = "newest") String sort,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "12") int size) {
        return ResponseEntity.ok(
                courseService.getCourses(search, categoryId, subscription, difficulty, sort, page, size));
    }

    @GetMapping("/featured")
    public ResponseEntity<ApiResponse<List<CourseResponse>>> getFeatured() {
        return ResponseEntity.ok(ApiResponse.ok(courseService.getFeaturedCourses()));
    }

    @GetMapping("/search")
    public ResponseEntity<PageResponse<CourseResponse>> search(
            @RequestParam String q,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "12") int size) {
        return ResponseEntity.ok(
                courseService.getCourses(q, null, null, null, "newest", page, size));
    }

    @GetMapping("/enrolled")
    public ResponseEntity<ApiResponse<List<CourseResponse>>> getEnrolled() {
        return ResponseEntity.ok(ApiResponse.ok(courseService.getEnrolledCourses()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<CourseResponse>> getCourse(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.ok(courseService.getCourseById(id)));
    }

    @PostMapping("/{id}/enroll")
    public ResponseEntity<ApiResponse<Void>> enroll(@PathVariable Long id) {
        courseService.enrollCourse(id);
        return ResponseEntity.ok(ApiResponse.ok("Enrolled successfully", null));
    }
}
