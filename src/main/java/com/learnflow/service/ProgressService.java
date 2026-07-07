package com.learnflow.service;

import com.learnflow.dto.response.ProgressResponse;
import com.learnflow.entity.*;
import com.learnflow.exception.ResourceNotFoundException;
import com.learnflow.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ProgressService {

    private final VideoRepository videoRepository;
    private final VideoProgressRepository videoProgressRepository;
    private final EnrollmentRepository enrollmentRepository;
    private final CourseRepository courseRepository;
    private final AuthService authService;

    public ProgressService(VideoRepository videoRepository,
                           VideoProgressRepository videoProgressRepository,
                           EnrollmentRepository enrollmentRepository,
                           CourseRepository courseRepository,
                           AuthService authService) {
        this.videoRepository = videoRepository;
        this.videoProgressRepository = videoProgressRepository;
        this.enrollmentRepository = enrollmentRepository;
        this.courseRepository = courseRepository;
        this.authService = authService;
    }

    @Transactional
    public void markVideoComplete(Long videoId) {
        Long userId = authService.getCurrentUserId();
        Video video = videoRepository.findById(videoId)
                .orElseThrow(() -> new ResourceNotFoundException("Video", videoId));

        videoProgressRepository.findByUserIdAndVideoId(userId, videoId)
                .ifPresentOrElse(
                        vp -> vp.setCompleted(true),
                        () -> {
                            User user = authService.getCurrentUser();
                            VideoProgress vp = new VideoProgress(user, video);
                            videoProgressRepository.save(vp);
                        }
                );

        updateEnrollmentProgress(userId, video.getSection().getCourse().getId());
    }

    public ProgressResponse getCourseProgress(Long courseId) {
        Long userId = authService.getCurrentUserId();
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new ResourceNotFoundException("Course", courseId));

        List<Video> allVideos = videoRepository.findByCourseIdOrdered(courseId);
        List<Long> completedIds = videoProgressRepository
                .findCompletedVideoIdsByUserAndCourse(userId, courseId);

        long total = allVideos.size();
        long completed = completedIds.size();
        int percent = total > 0 ? (int) ((completed * 100) / total) : 0;

        ProgressResponse r = new ProgressResponse();
        r.setCourseId(courseId);
        r.setCourseTitle(course.getTitle());
        r.setCompletedLessons(completed);
        r.setTotalLessons(total);
        r.setCompletedLessonIds(completedIds);
        r.setProgressPercent(percent);
        r.setCompleted(percent == 100);
        return r;
    }

    public List<ProgressResponse> getUserProgress() {
        Long userId = authService.getCurrentUserId();
        return enrollmentRepository.findByUserIdOrderByEnrolledAtDesc(userId)
                .stream().map(e -> {
                    Long courseId = e.getCourse().getId();
                    long total = videoRepository.findByCourseIdOrdered(courseId).size();
                    long done = videoProgressRepository.countCompletedByUserAndCourse(userId, courseId);
                    int pct = total > 0 ? (int) ((done * 100) / total) : 0;

                    ProgressResponse r = new ProgressResponse();
                    r.setCourseId(courseId);
                    r.setCourseTitle(e.getCourse().getTitle());
                    r.setCompletedLessons(done);
                    r.setTotalLessons(total);
                    r.setProgressPercent(pct);
                    r.setCompleted(e.getCompleted());
                    return r;
                }).toList();
    }

    private void updateEnrollmentProgress(Long userId, Long courseId) {
        enrollmentRepository.findByUserIdAndCourseId(userId, courseId).ifPresent(enrollment -> {
            long total = videoRepository.findByCourseIdOrdered(courseId).size();
            long done = videoProgressRepository.countCompletedByUserAndCourse(userId, courseId);
            int pct = total > 0 ? (int) ((done * 100) / total) : 0;
            enrollment.setProgressPercent(pct);
            enrollment.setCompleted(pct == 100);
            enrollmentRepository.save(enrollment);
        });
    }
}
