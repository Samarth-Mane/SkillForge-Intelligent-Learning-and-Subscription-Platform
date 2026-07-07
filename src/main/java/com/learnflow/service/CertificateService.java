package com.learnflow.service;

import com.learnflow.dto.response.CertificateResponse;
import com.learnflow.entity.*;
import com.learnflow.exception.BadRequestException;
import com.learnflow.exception.ResourceNotFoundException;
import com.learnflow.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class CertificateService {

    private final CertificateRepository certificateRepository;
    private final EnrollmentRepository enrollmentRepository;
    private final CourseRepository courseRepository;
    private final AuthService authService;
    private final EmailService emailService;

    public CertificateService(CertificateRepository certificateRepository,
                               EnrollmentRepository enrollmentRepository,
                               CourseRepository courseRepository,
                               AuthService authService,
                               EmailService emailService) {
        this.certificateRepository = certificateRepository;
        this.enrollmentRepository = enrollmentRepository;
        this.courseRepository = courseRepository;
        this.authService = authService;
        this.emailService = emailService;
    }

    public List<CertificateResponse> getUserCertificates() {
        Long userId = authService.getCurrentUserId();
        return certificateRepository.findByUserIdOrderByIssuedAtDesc(userId)
                .stream().map(this::toResponse).toList();
    }

    public CertificateResponse getCertificateByCourse(Long courseId) {
        Long userId = authService.getCurrentUserId();
        return certificateRepository.findByUserIdAndCourseId(userId, courseId)
                .map(this::toResponse)
                .orElseGet(() -> issueCertificate(courseId));
    }

    public CertificateResponse verifyCertificate(String certId) {
        Certificate cert = certificateRepository.findByCertificateId(certId)
                .orElseThrow(() -> new ResourceNotFoundException("Certificate not found: " + certId));
        return toResponse(cert);
    }

    @Transactional
    public CertificateResponse issueCertificate(Long courseId) {
        Long userId = authService.getCurrentUserId();

        if (certificateRepository.existsByUserIdAndCourseId(userId, courseId)) {
            return certificateRepository.findByUserIdAndCourseId(userId, courseId)
                    .map(this::toResponse).orElseThrow();
        }

        Enrollment enrollment = enrollmentRepository.findByUserIdAndCourseId(userId, courseId)
                .orElseThrow(() -> new BadRequestException("You must be enrolled to get a certificate"));

        if (!enrollment.getCompleted()) {
            throw new BadRequestException("Complete the course before claiming your certificate");
        }

        User user = authService.getCurrentUser();
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new ResourceNotFoundException("Course", courseId));

        Certificate cert = new Certificate(user, course);
        String courseCode = course.getTitle()
                .replaceAll("[^A-Za-z]", "")
                .toUpperCase();

        if (courseCode.length() > 6) {
            courseCode = courseCode.substring(0, 6);
        }

        String certId = String.format(
                "LF-%d-%s-%06d",
                java.time.Year.now().getValue(),
                courseCode,
                certificateRepository.count() + 1
        );

        cert.setCertificateId(certId);
        cert = certificateRepository.save(cert);

        emailService.sendCertificateIssued(
                user.getEmail(), user.getName(), course.getTitle(), cert.getCertificateId());

        return toResponse(cert);
    }

    private CertificateResponse toResponse(Certificate c) {
        String hours = "";
        if (c.getCourse().getDuration() != null) {
            hours = c.getCourse().getDuration().replaceAll("[^0-9].*", "");
        }
        CertificateResponse r = new CertificateResponse();
        r.setId(c.getId());
        r.setCertificateId(c.getCertificateId());
        r.setStudentName(c.getUser().getName());
        r.setCourseName(c.getCourse().getTitle());
        r.setInstructorName(c.getCourse().getInstructor());
        r.setCourseHours(hours);
        r.setIssuedAt(c.getIssuedAt());
        return r;
    }
}
