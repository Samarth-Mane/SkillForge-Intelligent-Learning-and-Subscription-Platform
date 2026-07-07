package com.learnflow.service;

import com.learnflow.entity.Category;
import com.learnflow.exception.BadRequestException;
import com.learnflow.exception.ResourceNotFoundException;
import com.learnflow.repository.CategoryRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @Transactional(readOnly = true)
    public List<Map<String, Object>> getAllCategories() {
        return categoryRepository.findAll().stream().map(c -> {
            Map<String, Object> map = new LinkedHashMap<>();
            map.put("id", c.getId());
            map.put("name", c.getName());
            map.put("description", c.getDescription() != null ? c.getDescription() : "");
            map.put("courses", c.getCourses().size());
            return map;
        }).toList();
    }

    public Map<String, Object> getCategoryById(Long id) {
        Category c = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category", id));
        Map<String, Object> map = new LinkedHashMap<>();
        map.put("id", c.getId());
        map.put("name", c.getName());
        map.put("description", c.getDescription() != null ? c.getDescription() : "");
        return map;
    }

    @Transactional
    public Category createCategory(String name, String description) {
        if (categoryRepository.existsByName(name)) {
            throw new BadRequestException("Category already exists: " + name);
        }
        return categoryRepository.save(new Category(name, description));
    }

    @Transactional
    public Category updateCategory(Long id, String name, String description) {
        Category cat = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category", id));
        if (name != null) cat.setName(name);
        if (description != null) cat.setDescription(description);
        return categoryRepository.save(cat);
    }

    @Transactional
    public void deleteCategory(Long id) {
        if (!categoryRepository.existsById(id)) {
            throw new ResourceNotFoundException("Category", id);
        }
        categoryRepository.deleteById(id);
    }
}
