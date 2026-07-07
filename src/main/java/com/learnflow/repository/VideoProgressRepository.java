package com.learnflow.repository;

import com.learnflow.entity.VideoProgress;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;
import java.util.Optional;

public interface VideoProgressRepository extends JpaRepository<VideoProgress, Long> {
    Optional<VideoProgress> findByUserIdAndVideoId(Long userId, Long videoId);

    @Query("SELECT vp.video.id FROM VideoProgress vp WHERE vp.user.id = :userId AND vp.completed = true AND vp.video.section.course.id = :courseId")
    List<Long> findCompletedVideoIdsByUserAndCourse(@Param("userId") Long userId, @Param("courseId") Long courseId);

    @Query("SELECT COUNT(vp) FROM VideoProgress vp WHERE vp.user.id = :userId AND vp.video.section.course.id = :courseId AND vp.completed = true")
    long countCompletedByUserAndCourse(@Param("userId") Long userId, @Param("courseId") Long courseId);
}
