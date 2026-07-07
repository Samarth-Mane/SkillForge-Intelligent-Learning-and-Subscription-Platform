package com.learnflow.repository;

import com.learnflow.entity.CourseSection;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CourseSectionRepository extends JpaRepository<CourseSection, Long> {
    List<CourseSection> findByCourseIdOrderBySectionOrderAsc(Long courseId);
}
