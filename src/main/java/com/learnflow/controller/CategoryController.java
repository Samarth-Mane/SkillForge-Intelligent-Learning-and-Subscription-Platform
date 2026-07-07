package com.learnflow.controller;

import com.learnflow.dto.response.ApiResponse;
import com.learnflow.service.CategoryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/categories")
public class CategoryController {

    private final CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<Map<String, Object>>>> getAll() {
        return ResponseEntity.ok(ApiResponse.ok(categoryService.getAllCategories()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getById(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.ok(categoryService.getCategoryById(id)));
    }
}
