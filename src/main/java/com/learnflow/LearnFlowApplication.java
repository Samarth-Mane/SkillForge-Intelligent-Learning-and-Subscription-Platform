package com.learnflow;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
public class LearnFlowApplication {
    public static void main(String[] args) {
        SpringApplication.run(LearnFlowApplication.class, args);
    }
}
