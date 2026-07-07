package com.learnflow.service;

import com.learnflow.dto.response.*;
import com.learnflow.entity.*;
import com.learnflow.enums.*;
import com.learnflow.exception.BadRequestException;
import com.learnflow.exception.ResourceNotFoundException;
import com.learnflow.repository.*;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
public class AdminService {

    private final UserRepository userRepository;
    private final CourseRepository courseRepository;
    private final EnrollmentRepository enrollmentRepository;
    private final CertificateRepository certificateRepository;
    private final SubscriptionRepository subscriptionRepository;
    private final VideoRepository videoRepository;
    private final CourseSectionRepository sectionRepository;
    private final QuizRepository quizRepository;
    private final QuizAttemptRepository quizAttemptRepository;
    private final QuizService quizService;

    public AdminService(UserRepository userRepository,
                        CourseRepository courseRepository,
                        EnrollmentRepository enrollmentRepository,
                        CertificateRepository certificateRepository,
                        SubscriptionRepository subscriptionRepository,
                        VideoRepository videoRepository,
                        CourseSectionRepository sectionRepository,
                        QuizRepository quizRepository,
                        QuizAttemptRepository quizAttemptRepository,
                        QuizService quizService) {
        this.userRepository = userRepository;
        this.courseRepository = courseRepository;
        this.enrollmentRepository = enrollmentRepository;
        this.certificateRepository = certificateRepository;
        this.subscriptionRepository = subscriptionRepository;
        this.videoRepository = videoRepository;
        this.sectionRepository = sectionRepository;
        this.quizRepository = quizRepository;
        this.quizAttemptRepository = quizAttemptRepository;
        this.quizService = quizService;
    }

    public AdminStatsResponse getDashboardStats() {
        long totalUsers   = userRepository.count();
        long totalCourses = courseRepository.count();
        long activeSubs   = subscriptionRepository.countByActiveTrue();
        long certs        = certificateRepository.count();
        long completed    = enrollmentRepository.countByCompleted(true);
        long totalEnroll  = enrollmentRepository.count();
        int completionRate = totalEnroll > 0 ? (int) ((completed * 100) / totalEnroll) : 0;

        List<User> recent = userRepository.findAll(
                PageRequest.of(0, 5, Sort.by(Sort.Direction.DESC, "createdAt"))).getContent();

        List<Map<String, Object>> recentUsers = recent.stream().map(u -> {
            Subscription sub = subscriptionRepository.findByUserId(u.getId()).orElse(null);
            Map<String, Object> m = new LinkedHashMap<>();
            m.put("id", u.getId());
            m.put("name", u.getName());
            m.put("email", u.getEmail());
            m.put("plan", sub != null ? sub.getPlan().name() : "FREE");
            m.put("status", u.getStatus().name());
            m.put("joinedAt", u.getCreatedAt());
            return m;
        }).toList();

        List<Course> top = courseRepository.findTop8ByStatusOrderByStudentsCountDesc(CourseStatus.PUBLISHED);
        List<Map<String, Object>> topCourses = top.stream().map(c -> {
            Map<String, Object> m = new LinkedHashMap<>();
            m.put("id", c.getId());
            m.put("title", c.getTitle());
            m.put("students", c.getStudentsCount());
            m.put("rating", c.getRating());
            m.put("revenue", c.getSubscriptionType() == SubscriptionType.FREE ? 0 :
                    c.getStudentsCount() * (c.getSubscriptionType() == SubscriptionType.PLUS ? 29 : 59));
            return m;
        }).toList();

        AdminStatsResponse r = new AdminStatsResponse();
        r.setTotalUsers(totalUsers);
        r.setTotalCourses(totalCourses);
        r.setActiveSubscriptions(activeSubs);
        r.setCertificatesIssued(certs);
        r.setCompletionRate(completionRate);
        r.setMonthlyRevenue(activeSubs * 35L);
        r.setRecentUsers(recentUsers);
        r.setTopCourses(topCourses);
        return r;
    }

    public PageResponse<UserResponse> getUsers(String search, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdAt"));
        Page<User> users = userRepository.searchUsers(search, pageable);
        return PageResponse.of(users.map(u -> {
            Subscription sub = subscriptionRepository.findByUserId(u.getId()).orElse(null);
            UserResponse r = new UserResponse();
            r.setId(u.getId());
            r.setName(u.getName());
            r.setEmail(u.getEmail());
            r.setRole(u.getRole());
            r.setStatus(u.getStatus());
            r.setAvatarUrl(u.getAvatarUrl());
            r.setCreatedAt(u.getCreatedAt());
            r.setPlan(sub != null ? sub.getPlan().name() : "FREE");
            r.setCoursesEnrolled(u.getEnrollments().size());
            return r;
        }));
    }

    @Transactional
    public void updateUserStatus(Long userId, String status) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", userId));
        try {
            user.setStatus(UserStatus.valueOf(status));
        } catch (Exception e) {
            throw new BadRequestException("Invalid status: " + status);
        }
        userRepository.save(user);
    }

    @Transactional
    public Video createVideo(Long courseId, String title, String youtubeUrl,
                             String duration, Integer lessonOrder, Boolean isFree, Long sectionId) {
        CourseSection section;
        if (sectionId != null) {
            section = sectionRepository.findById(sectionId)
                    .orElseThrow(() -> new ResourceNotFoundException("Section", sectionId));
        } else {
            Course course = courseRepository.findById(courseId)
                    .orElseThrow(() -> new ResourceNotFoundException("Course", courseId));
            section = course.getSections().stream().findFirst().orElseGet(() -> {
                CourseSection ns = new CourseSection("Section 1", 1, course);
                return sectionRepository.save(ns);
            });
        }
        Video video = new Video(title, youtubeUrl, duration, lessonOrder, isFree, section);
        return videoRepository.save(video);
    }

    @Transactional
    public Video updateVideo(Long videoId, String title, String youtubeUrl,
                             String duration, Integer lessonOrder, Boolean isFree) {
        Video video = videoRepository.findById(videoId)
                .orElseThrow(() -> new ResourceNotFoundException("Video", videoId));
        if (title != null)       video.setTitle(title);
        if (youtubeUrl != null)  video.setYoutubeUrl(youtubeUrl);
        if (duration != null)    video.setDuration(duration);
        if (lessonOrder != null) video.setLessonOrder(lessonOrder);
        if (isFree != null)      video.setIsFree(isFree);
        return videoRepository.save(video);
    }

    @Transactional
    public void deleteVideo(Long videoId) {
        if (!videoRepository.existsById(videoId)) {
            throw new ResourceNotFoundException("Video", videoId);
        }
        videoRepository.deleteById(videoId);
    }

    @Transactional
    public QuizResponse createQuiz(Long courseId, String title, Integer timeLimit,
                                   Integer passMark, List<Map<String, Object>> questions) {
        if (quizRepository.existsByCourseId(courseId)) {
            throw new BadRequestException("A quiz already exists for this course");
        }
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new ResourceNotFoundException("Course", courseId));

        Quiz quiz = new Quiz(title, timeLimit, passMark, course);
        quiz = quizRepository.save(quiz);

        if (questions != null) {
            int order = 1;
            for (Map<String, Object> q : questions) {
                @SuppressWarnings("unchecked")
                List<String> opts = (List<String>) q.get("options");
                Question question = new Question(
                        (String) q.get("text"),
                        (Integer) q.get("correctOption"),
                        order++,
                        quiz,
                        opts != null ? opts : List.of()
                );
                quiz.getQuestions().add(question);
            }
            quizRepository.save(quiz);
        }

        return quizService.toResponse(quiz);
    }

    @Transactional
    public void deleteQuiz(Long quizId) {
        if (!quizRepository.existsById(quizId)) {
            throw new ResourceNotFoundException("Quiz", quizId);
        }
        quizRepository.deleteById(quizId);
    }

    public List<QuizResponse> getAllQuizzes() {
        return quizRepository.findAll().stream().map(quizService::toResponse).toList();
    }
}
