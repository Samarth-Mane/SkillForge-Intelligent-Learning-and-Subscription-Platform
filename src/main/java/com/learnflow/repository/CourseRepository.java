package com.learnflow.repository;

import com.learnflow.entity.Course;
import com.learnflow.enums.CourseStatus;
import com.learnflow.enums.DifficultyLevel;
import com.learnflow.enums.SubscriptionType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CourseRepository extends JpaRepository<Course, Long> {
    List<Course> findTop8ByStatusAndFeaturedTrueOrderByStudentsCountDesc(CourseStatus status);
    List<Course> findTop8ByStatusOrderByStudentsCountDesc(CourseStatus status);
    long countByStatus(CourseStatus status);

    @Query("SELECT c FROM Course c WHERE c.status = 'PUBLISHED' AND " +
           "(:search IS NULL OR LOWER(c.title) LIKE LOWER(CONCAT('%',:search,'%')) OR LOWER(c.instructor) LIKE LOWER(CONCAT('%',:search,'%'))) AND " +
           "(:categoryId IS NULL OR c.category.id = :categoryId) AND " +
           "(:subscriptionType IS NULL OR c.subscriptionType = :subscriptionType) AND " +
           "(:difficulty IS NULL OR c.difficulty = :difficulty)")
    Page<Course> searchCourses(@Param("search") String search,
                               @Param("categoryId") Long categoryId,
                               @Param("subscriptionType") SubscriptionType subscriptionType,
                               @Param("difficulty") DifficultyLevel difficulty,
                               Pageable pageable);
}
