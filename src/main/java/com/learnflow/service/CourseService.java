package com.learnflow.service;

import com.learnflow.dto.request.CourseRequest;
import com.learnflow.dto.response.CourseResponse;
import com.learnflow.dto.response.PageResponse;
import com.learnflow.entity.*;
import com.learnflow.enums.*;
import com.learnflow.exception.BadRequestException;
import com.learnflow.exception.ResourceNotFoundException;
import com.learnflow.repository.*;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class CourseService {

    private final CourseRepository courseRepository;
    private final CategoryRepository categoryRepository;
    private final EnrollmentRepository enrollmentRepository;
    private final AuthService authService;

    public CourseService(CourseRepository courseRepository,
                         CategoryRepository categoryRepository,
                         EnrollmentRepository enrollmentRepository,
                         AuthService authService) {
        this.courseRepository = courseRepository;
        this.categoryRepository = categoryRepository;
        this.enrollmentRepository = enrollmentRepository;
        this.authService = authService;
    }

    @Transactional(readOnly = true)
    public PageResponse<CourseResponse> getCourses(String search, Long categoryId,
                                                    String subscriptionType, String difficulty,
                                                    String sort, int page, int size) {
        SubscriptionType subType = null;
        DifficultyLevel diff = null;
        if (subscriptionType != null && !subscriptionType.isBlank()) {
            try { subType = SubscriptionType.valueOf(subscriptionType); } catch (Exception ignored) {}
        }
        if (difficulty != null && !difficulty.isBlank()) {
            try { diff = DifficultyLevel.valueOf(difficulty); } catch (Exception ignored) {}
        }
        Sort sorting = switch (sort != null ? sort : "newest") {
            case "popular" -> Sort.by(Sort.Direction.DESC, "studentsCount");
            case "rating"  -> Sort.by(Sort.Direction.DESC, "rating");
            case "az"      -> Sort.by(Sort.Direction.ASC,  "title");
            default        -> Sort.by(Sort.Direction.DESC, "createdAt");
        };
        Pageable pageable = PageRequest.of(page, size, sorting);
        Page<Course> courses = courseRepository.searchCourses(search, categoryId, subType, diff, pageable);
        return PageResponse.of(courses.map(this::toResponse));
    }

    @Transactional(readOnly = true)
    public CourseResponse getCourseById(Long id) {
    Course course = courseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Course", id));
        return toDetailedResponse(course);
    }

    @Transactional(readOnly = true)
    public List<CourseResponse> getFeaturedCourses() {
        List<Course> featured = courseRepository
                .findTop8ByStatusAndFeaturedTrueOrderByStudentsCountDesc(CourseStatus.PUBLISHED);
        if (featured.isEmpty()) {
            featured = courseRepository.findTop8ByStatusOrderByStudentsCountDesc(CourseStatus.PUBLISHED);
        }
        return featured.stream().map(this::toResponse).toList();
    }

    @Transactional(readOnly = true)
    public List<CourseResponse> getEnrolledCourses() {
        Long userId = authService.getCurrentUserId();

        return enrollmentRepository.findByUserIdOrderByEnrolledAtDesc(userId)
                .stream()
                .map(e -> toResponse(e.getCourse()))
                .toList();
    }

    @Transactional
    public void enrollCourse(Long courseId) {
        Long userId = authService.getCurrentUserId();
        if (enrollmentRepository.existsByUserIdAndCourseId(userId, courseId)) {
            throw new BadRequestException("You are already enrolled in this course");
        }
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new ResourceNotFoundException("Course", courseId));
        User user = authService.getCurrentUser();
        
        Subscription subscription = user.getSubscription();

        SubscriptionType userPlan = subscription != null
                ? subscription.getPlan()
                : SubscriptionType.FREE;

        SubscriptionType coursePlan = course.getSubscriptionType();

        // FREE user cannot enroll in PLUS or PREMIUM
        if (userPlan == SubscriptionType.FREE &&
                coursePlan != SubscriptionType.FREE) {

            throw new BadRequestException(
                    "Upgrade your subscription to access this course."
            );
        }

        // PLUS user cannot enroll in PREMIUM
        if (userPlan == SubscriptionType.PLUS &&
                coursePlan == SubscriptionType.PREMIUM) {

            throw new BadRequestException(
                    "Upgrade to Premium to access this course."
            );
        }

        Enrollment enrollment = new Enrollment(user, course);
        enrollmentRepository.save(enrollment);

        course.setStudentsCount(course.getStudentsCount() + 1);
        courseRepository.save(course);
    }

    @Transactional
    public CourseResponse createCourse(CourseRequest.Create req) {
        Category category = categoryRepository.findById(req.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Category", req.getCategoryId()));

        Course course = new Course();
        course.setTitle(req.getTitle());
        course.setDescription(req.getDescription());
        course.setInstructor(req.getInstructor());
        course.setInstructorBio(req.getInstructorBio());
        course.setInstructorAvatar(req.getInstructorAvatar());
        course.setThumbnailUrl(req.getThumbnailUrl());
        course.setDuration(req.getDuration());
        course.setLanguage(req.getLanguage() != null ? req.getLanguage() : "English");
        course.setCategory(category);
        course.setSubscriptionType(req.getSubscriptionType());
        course.setDifficulty(req.getDifficulty());
        course.setFeatured(req.getFeatured() != null && req.getFeatured());
        course.setStatus(CourseStatus.DRAFT);
        course.setRating(0.0);
        course.setStudentsCount(0);
        return toResponse(courseRepository.save(course));
    }

    @Transactional
    public CourseResponse updateCourse(Long id, CourseRequest.Update req) {
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Course", id));

        if (req.getTitle() != null)            course.setTitle(req.getTitle());
        if (req.getDescription() != null)      course.setDescription(req.getDescription());
        if (req.getInstructor() != null)       course.setInstructor(req.getInstructor());
        if (req.getInstructorBio() != null)    course.setInstructorBio(req.getInstructorBio());
        if (req.getThumbnailUrl() != null)     course.setThumbnailUrl(req.getThumbnailUrl());
        if (req.getDuration() != null)         course.setDuration(req.getDuration());
        if (req.getLanguage() != null)         course.setLanguage(req.getLanguage());
        if (req.getSubscriptionType() != null) course.setSubscriptionType(req.getSubscriptionType());
        if (req.getDifficulty() != null)       course.setDifficulty(req.getDifficulty());
        if (req.getFeatured() != null)         course.setFeatured(req.getFeatured());
        if (req.getStatus() != null) {
            try { course.setStatus(CourseStatus.valueOf(req.getStatus())); } catch (Exception ignored) {}
        }
        if (req.getCategoryId() != null) {
            Category cat = categoryRepository.findById(req.getCategoryId())
                    .orElseThrow(() -> new ResourceNotFoundException("Category", req.getCategoryId()));
            course.setCategory(cat);
        }
        return toResponse(courseRepository.save(course));
    }

    @Transactional
    public void deleteCourse(Long id) {
        if (!courseRepository.existsById(id)) throw new ResourceNotFoundException("Course", id);
        courseRepository.deleteById(id);
    }

    // ── Mappers ──────────────────────────────────────────────────
    private CourseResponse toResponse(Course c) {
        CourseResponse r = new CourseResponse();
        r.setId(c.getId());
        r.setTitle(c.getTitle());
        r.setInstructor(c.getInstructor());
        r.setThumbnailUrl(c.getThumbnailUrl());
        r.setDuration(c.getDuration());
        r.setSubscriptionType(c.getSubscriptionType());
        r.setDifficulty(c.getDifficulty());
        r.setStatus(c.getStatus());
        r.setRating(c.getRating());
        r.setStudentsCount(c.getStudentsCount());
        r.setFeatured(c.getFeatured());
        r.setCategory(c.getCategory() != null ? c.getCategory().getName() : null);
        r.setCategoryId(c.getCategory() != null ? c.getCategory().getId() : null);
        r.setCreatedAt(c.getCreatedAt());
        r.setUpdatedAt(c.getUpdatedAt());
        return r;
    }

    private CourseResponse toDetailedResponse(Course c) {
        CourseResponse r = toResponse(c);
        r.setDescription(c.getDescription());
        r.setInstructorBio(c.getInstructorBio());
        r.setInstructorAvatar(c.getInstructorAvatar());
        r.setLanguage(c.getLanguage());

        List<CourseResponse.SectionResponse> sections = c.getSections().stream()
                .map(s -> {
                    List<CourseResponse.VideoResponse> lessons = s.getVideos().stream()
                            .map(v -> new CourseResponse.VideoResponse(
                                    v.getId(), v.getTitle(), v.getYoutubeUrl(),
                                    v.getDuration(), v.getLessonOrder(), v.getIsFree()))
                            .toList();
                    return new CourseResponse.SectionResponse(
                            s.getId(), s.getTitle(), s.getSectionOrder(), lessons);
                }).toList();
        r.setCurriculum(sections);
        return r;
    }
}
