package com.learnflow.repository;

import com.learnflow.entity.Video;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface VideoRepository extends JpaRepository<Video, Long> {
    @Query("SELECT v FROM Video v JOIN v.section s WHERE s.course.id = :courseId ORDER BY s.sectionOrder, v.lessonOrder")
    List<Video> findByCourseIdOrdered(@Param("courseId") Long courseId);
}
