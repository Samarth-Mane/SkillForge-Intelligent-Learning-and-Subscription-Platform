package com.learnflow.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private static final Logger logger = LoggerFactory.getLogger(EmailService.class);

    private final JavaMailSender mailSender;

    @Value("${app.mail.from}")
    private String fromEmail;

    @Value("${app.frontend.url}")
    private String frontendUrl;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    @Async
    public void sendPasswordReset(String toEmail, String name, String token) {
        String resetUrl = frontendUrl + "/reset-password?token=" + token;
        sendEmail(toEmail, "Reset Your LearnFlow Password", buildPasswordResetEmail(name, resetUrl));
    }

    @Async
    public void sendWelcome(String toEmail, String name) {
        sendEmail(toEmail, "Welcome to LearnFlow! 🎓", buildWelcomeEmail(name));
    }

    @Async
    public void sendCertificateIssued(String toEmail, String name, String courseName, String certId) {
        sendEmail(toEmail, "🏆 Your Certificate is Ready — " + courseName,
                buildCertificateEmail(name, courseName, certId));
    }

    private void sendEmail(String to, String subject, String htmlBody) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            helper.setFrom(fromEmail);
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(htmlBody, true);
            mailSender.send(message);
            logger.info("Email sent to: {}", to);
        } catch (MessagingException e) {
            logger.error("Failed to send email to {}: {}", to, e.getMessage());
        }
    }

    private String buildPasswordResetEmail(String name, String resetUrl) {
        return "<div style=\"font-family:Inter,sans-serif;max-width:560px;margin:0 auto;background:#0A0F1E;color:#e2e8f0;padding:40px;border-radius:16px;\">"
             + "<h1 style=\"background:linear-gradient(to right,#818CF8,#A78BFA);-webkit-background-clip:text;-webkit-text-fill-color:transparent;\">LearnFlow</h1>"
             + "<h2 style=\"color:#f1f5f9;\">Hi " + name + ",</h2>"
             + "<p style=\"color:#94a3b8;\">We received a request to reset your password.</p>"
             + "<div style=\"text-align:center;margin:32px 0;\">"
             + "<a href=\"" + resetUrl + "\" style=\"background:linear-gradient(135deg,#6366F1,#8B5CF6);color:#fff;text-decoration:none;padding:14px 32px;border-radius:12px;font-weight:600;\">Reset Password</a>"
             + "</div>"
             + "<p style=\"color:#64748b;font-size:13px;\">This link expires in 1 hour.</p>"
             + "</div>";
    }

    private String buildWelcomeEmail(String name) {
        return "<div style=\"font-family:Inter,sans-serif;max-width:560px;margin:0 auto;background:#0A0F1E;color:#e2e8f0;padding:40px;border-radius:16px;\">"
             + "<h1 style=\"background:linear-gradient(to right,#818CF8,#A78BFA);-webkit-background-clip:text;-webkit-text-fill-color:transparent;\">LearnFlow</h1>"
             + "<h2 style=\"color:#f1f5f9;\">Welcome, " + name + "! 🎉</h2>"
             + "<p style=\"color:#94a3b8;\">Your account is ready. Start exploring expert-led courses.</p>"
             + "<div style=\"text-align:center;margin:32px 0;\">"
             + "<a href=\"" + frontendUrl + "/courses\" style=\"background:linear-gradient(135deg,#6366F1,#8B5CF6);color:#fff;text-decoration:none;padding:14px 32px;border-radius:12px;font-weight:600;\">Browse Courses</a>"
             + "</div></div>";
    }

    private String buildCertificateEmail(String name, String courseName, String certId) {
        return "<div style=\"font-family:Inter,sans-serif;max-width:560px;margin:0 auto;background:#0A0F1E;color:#e2e8f0;padding:40px;border-radius:16px;\">"
             + "<h2 style=\"color:#f1f5f9;\">Congratulations, " + name + "! 🏆</h2>"
             + "<p style=\"color:#94a3b8;\">You've successfully completed <strong style=\"color:#818CF8;\">" + courseName + "</strong>.</p>"
             + "<p style=\"color:#64748b;font-size:13px;\">Certificate ID: " + certId + "</p>"
             + "<div style=\"text-align:center;margin:32px 0;\">"
             + "<a href=\"" + frontendUrl + "/dashboard\" style=\"background:linear-gradient(135deg,#6366F1,#8B5CF6);color:#fff;text-decoration:none;padding:14px 32px;border-radius:12px;font-weight:600;\">View Certificate</a>"
             + "</div></div>";
    }
}
