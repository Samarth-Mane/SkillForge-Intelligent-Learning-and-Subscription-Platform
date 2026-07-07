package com.learnflow.controller;

import com.learnflow.dto.response.ApiResponse;
import com.learnflow.dto.response.CertificateResponse;
import com.learnflow.service.CertificateService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/certificates")
public class CertificateController {

    private final CertificateService certificateService;

    public CertificateController(CertificateService certificateService) {
        this.certificateService = certificateService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<CertificateResponse>>> getMyCertificates() {
        return ResponseEntity.ok(ApiResponse.ok(certificateService.getUserCertificates()));
    }

    @GetMapping("/course/{courseId}")
    public ResponseEntity<ApiResponse<CertificateResponse>> getCertificateByCourse(@PathVariable Long courseId) {
        return ResponseEntity.ok(ApiResponse.ok(certificateService.getCertificateByCourse(courseId)));
    }

    @GetMapping("/verify/{certId}")
    public ResponseEntity<ApiResponse<CertificateResponse>> verifyCertificate(@PathVariable String certId) {
        return ResponseEntity.ok(ApiResponse.ok(certificateService.verifyCertificate(certId)));
    }
}
