package com.learnflow.config;

import com.learnflow.entity.*;
import com.learnflow.enums.*;
import com.learnflow.repository.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDateTime;
import java.util.List;

@Configuration
public class DataSeeder {

    private static final Logger logger = LoggerFactory.getLogger(DataSeeder.class);

    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;
    private final CourseRepository courseRepository;
    private final CourseSectionRepository sectionRepository;
    private final VideoRepository videoRepository;
    private final SubscriptionRepository subscriptionRepository;
    private final QuizRepository quizRepository;
    private final PasswordEncoder passwordEncoder;

    public DataSeeder(UserRepository userRepository,
                      CategoryRepository categoryRepository,
                      CourseRepository courseRepository,
                      CourseSectionRepository sectionRepository,
                      VideoRepository videoRepository,
                      SubscriptionRepository subscriptionRepository,
                      QuizRepository quizRepository,
                      PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.categoryRepository = categoryRepository;
        this.courseRepository = courseRepository;
        this.sectionRepository = sectionRepository;
        this.videoRepository = videoRepository;
        this.subscriptionRepository = subscriptionRepository;
        this.quizRepository = quizRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Bean
    CommandLineRunner seed() {
        return args -> {
            if (userRepository.count() > 0) {
                logger.info("Database already seeded — skipping.");
                return;
            }
            logger.info("Seeding database...");
            seedUsers();
            seedCategoriesAndCourses();
            logger.info("Database seeding complete.");
        };
    }

    private void seedUsers() {
        User admin = new User("LearnFlow Admin", "admin@learnflow.com",
                passwordEncoder.encode("Admin@123"), Role.ADMIN, UserStatus.ACTIVE);
        admin = userRepository.save(admin);
        subscriptionRepository.save(new Subscription(admin, SubscriptionType.PREMIUM));

        User user = new User("Alex Johnson", "user@learnflow.com",
                passwordEncoder.encode("User@123"), Role.USER, UserStatus.ACTIVE);
        user = userRepository.save(user);
        Subscription sub = new Subscription(user, SubscriptionType.PLUS);
        sub.setExpiresAt(LocalDateTime.now().plusMonths(6));
        subscriptionRepository.save(sub);

        logger.info("Seeded users → admin@learnflow.com / Admin@123 | user@learnflow.com / User@123");
    }

    private void seedCategoriesAndCourses() {
        Category webDev  = categoryRepository.save(new Category("Web Development",  "Frontend and backend web technologies"));
        Category backend = categoryRepository.save(new Category("Backend",           "Server-side development and APIs"));
        Category aiml   = categoryRepository.save(new Category("AI & ML",           "Artificial intelligence and machine learning"));
        Category cloud   = categoryRepository.save(new Category("Cloud & DevOps",   "Cloud platforms and DevOps practices"));
        Category cyber = categoryRepository.save(new Category("Cybersecurity", "Security, ethical hacking, and compliance"));
        Category dataScience = categoryRepository.save(new Category("Data Science", "Data analysis, visualization, and statistics"));
        Category mobile = categoryRepository.save(new Category("Mobile Dev", "iOS, Android, and cross-platform development"));
        Category systemDesign = categoryRepository.save(new Category("System Design", "Architecture, scalability, and design patterns"));


        // ── React 18 ──────────────────────────────────────────────
        Course react = new Course();
        react.setTitle("Complete React 18 — From Zero to Hero");
        react.setDescription("Master React 18 from scratch with hooks, context, routing, and real-world projects.");
        react.setInstructor("Sarah Chen");
        react.setInstructorBio("Senior Frontend Engineer. Previously at Google and Stripe.");
        react.setThumbnailUrl("https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800");
        react.setDuration("32h 45m");
        react.setCategory(webDev);
        react.setSubscriptionType(SubscriptionType.PLUS);
        react.setDifficulty(DifficultyLevel.Intermediate);
        react.setStatus(CourseStatus.PUBLISHED);
        react.setRating(4.9);
        react.setStudentsCount(18420);
        react.setFeatured(true);
        react.setLanguage("English");
        react = courseRepository.save(react);
        addReactCurriculum(react);

        // ── Spring Boot 3 ─────────────────────────────────────────
        Course spring = new Course();
        spring.setTitle("Spring Boot 3 Masterclass with Microservices");
        spring.setDescription("Production-ready Spring Boot 3 with Security, JPA, Docker, and microservices.");
        spring.setInstructor("James Wilson");
        spring.setInstructorBio("Principal Java Architect with 15 years at Oracle.");
        spring.setThumbnailUrl("https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800");
        spring.setDuration("48h 10m");
        spring.setCategory(backend);
        spring.setSubscriptionType(SubscriptionType.PREMIUM);
        spring.setDifficulty(DifficultyLevel.Advanced);
        spring.setStatus(CourseStatus.PUBLISHED);
        spring.setRating(4.8);
        spring.setStudentsCount(12350);
        spring.setFeatured(true);
        spring.setLanguage("English");
        spring = courseRepository.save(spring);
        addSpringCurriculum(spring);

        // ── Python ML (Free) ──────────────────────────────────────
        Course python = new Course();
        python.setTitle("Python for Data Science & Machine Learning");
        python.setDescription("Complete Python roadmap from basics to neural networks. 12 real-world projects.");
        python.setInstructor("Dr. Priya Sharma");
        python.setInstructorBio("PhD in CS, AI researcher, ex-DeepMind.");
        python.setThumbnailUrl("https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800");
        python.setDuration("55h 30m");
        python.setCategory(aiml);
        python.setSubscriptionType(SubscriptionType.FREE);
        python.setDifficulty(DifficultyLevel.Beginner);
        python.setStatus(CourseStatus.PUBLISHED);
        python.setRating(4.9);
        python.setStudentsCount(34200);
        python.setFeatured(true);
        python.setLanguage("English");
        python = courseRepository.save(python);
        addPythonCurriculum(python);

        // ── AWS ───────────────────────────────────────────────────
        Course aws = new Course();
        aws.setTitle("AWS Cloud Practitioner & Solutions Architect");
        aws.setDescription("Prepare for AWS certifications with hands-on labs and real architecture.");
        aws.setInstructor("Michael Torres");
        aws.setThumbnailUrl("https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800");
        aws.setDuration("28h 15m");
        aws.setCategory(cloud);
        aws.setSubscriptionType(SubscriptionType.PLUS);
        aws.setDifficulty(DifficultyLevel.Intermediate);
        aws.setStatus(CourseStatus.PUBLISHED);
        aws.setRating(4.7);
        aws.setStudentsCount(9870);
        aws.setLanguage("English");
        aws = courseRepository.save(aws);
        addAwsCurriculum(aws);

        // ── Docker & Kubernetes ───────────────────────────────────
        Course docker = new Course();
        docker.setTitle("Docker & Kubernetes: The Complete Guide");
        docker.setDescription("Container orchestration from scratch. Production DevOps with Docker and K8s.");
        docker.setInstructor("Emma Brown");
        docker.setThumbnailUrl("https://images.unsplash.com/photo-1605745341112-85968b19335b?w=800");
        docker.setDuration("22h 30m");
        docker.setCategory(cloud);
        docker.setSubscriptionType(SubscriptionType.PREMIUM);
        docker.setDifficulty(DifficultyLevel.Advanced);
        docker.setStatus(CourseStatus.PUBLISHED);
        docker.setRating(4.8);
        docker.setStudentsCount(7650);
        docker.setLanguage("English");
        docker = courseRepository.save(docker);
        addDockerCurriculum(docker);
        
        // ── TypeScript ────────────────────────────────────────────
        Course ts = new Course();
        ts.setTitle("TypeScript Deep Dive for JavaScript Developers");
        ts.setDescription("Master TypeScript with generics, decorators, advanced types, React and Node.js.");
        ts.setInstructor("David Lee");
        ts.setThumbnailUrl("https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800");
        ts.setDuration("18h 45m");
        ts.setCategory(webDev);
        ts.setSubscriptionType(SubscriptionType.PLUS);
        ts.setDifficulty(DifficultyLevel.Intermediate);
        ts.setStatus(CourseStatus.PUBLISHED);
        ts.setRating(4.8);
        ts.setStudentsCount(11200);
        ts.setLanguage("English");
        ts = courseRepository.save(ts);
        addTypeScriptCurriculum(ts);
        
     // HTML & CSS Bootcamp
        Course html = new Course();
        html.setTitle("HTML & CSS Bootcamp");
        html.setDescription("Master HTML5 and CSS3 by building responsive websites.");
        html.setInstructor("Kevin Powell");
        html.setThumbnailUrl("https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800");
        html.setDuration("26h 20m");
        html.setCategory(webDev);
        html.setSubscriptionType(SubscriptionType.FREE);
        html.setDifficulty(DifficultyLevel.Beginner);
        html.setStatus(CourseStatus.PUBLISHED);
        html.setFeatured(true);
        html.setRating(4.8);
        html.setStudentsCount(21500);

        html = courseRepository.save(html);

        addHtmlCurriculum(html);
        
        
     // Angular 18 Masterclass
        Course angular = new Course();
        angular.setTitle("Angular 18 Masterclass");
        angular.setDescription("Learn Angular 18 from scratch by building enterprise-grade web applications.");
        angular.setInstructor("Maximilian Schwarzmüller");
        angular.setThumbnailUrl("https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800");
        angular.setDuration("34h 10m");
        angular.setCategory(webDev);
        angular.setSubscriptionType(SubscriptionType.PLUS);
        angular.setDifficulty(DifficultyLevel.Intermediate);
        angular.setStatus(CourseStatus.PUBLISHED);
        angular.setFeatured(false);
        angular.setRating(4.8);
        angular.setStudentsCount(18650);

        angular = courseRepository.save(angular);

        addAngularCurriculum(angular);
        
     // Tailwind CSS Complete Guide
        Course tailwind = new Course();
        tailwind.setTitle("Tailwind CSS Complete Guide");
        tailwind.setDescription("Build modern, responsive websites using Tailwind CSS from beginner to advanced.");
        tailwind.setInstructor("Brad Traversy");
        tailwind.setThumbnailUrl("https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800");
        tailwind.setDuration("18h 45m");
        tailwind.setCategory(webDev);
        tailwind.setSubscriptionType(SubscriptionType.FREE);
        tailwind.setDifficulty(DifficultyLevel.Beginner);
        tailwind.setStatus(CourseStatus.PUBLISHED);
        tailwind.setFeatured(false);
        tailwind.setRating(4.8);
        tailwind.setStudentsCount(17500);

        tailwind = courseRepository.save(tailwind);

        addTailwindCurriculum(tailwind);

        // ── Node.js (Free) ────────────────────────────────────────
        Course node = new Course();
        node.setTitle("Node.js & Express — Backend from Scratch");
        node.setDescription("Build RESTful APIs with Node.js, Express, MongoDB, and JWT authentication.");
        node.setInstructor("Chris Wang");
        node.setThumbnailUrl("https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800");
        node.setDuration("24h 20m");
        node.setCategory(backend);
        node.setSubscriptionType(SubscriptionType.FREE);
        node.setDifficulty(DifficultyLevel.Beginner);
        node.setStatus(CourseStatus.PUBLISHED);
        node.setRating(4.7);
        node.setStudentsCount(22100);
        node.setLanguage("English");
        node = courseRepository.save(node);
        addNodeCurriculum(node);

        logger.info("Course data seeded successfully");
        
        Course kotlin = new Course();
        kotlin.setTitle("Android Development with Kotlin");
        kotlin.setDescription("Learn Android app development using Kotlin from beginner to advanced.");
        kotlin.setInstructor("Philipp Lackner");
        kotlin.setThumbnailUrl("https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800");
        kotlin.setDuration("42h 15m");
        kotlin.setCategory(mobile);
        kotlin.setSubscriptionType(SubscriptionType.PLUS);
        kotlin.setDifficulty(DifficultyLevel.Beginner);
        kotlin.setStatus(CourseStatus.PUBLISHED);
        kotlin.setFeatured(true);
        kotlin.setRating(4.9);
        kotlin.setStudentsCount(28500);

        kotlin = courseRepository.save(kotlin);

        addKotlinCurriculum(kotlin);
        
        //----------------------------------------
        Course dataScienceCourse = new Course();
        dataScienceCourse.setTitle("Data Science & Machine Learning Masterclass");
        dataScienceCourse.setDescription("Master Data Science, Data Analysis, Machine Learning, Python, NumPy, Pandas, Matplotlib, and Scikit-Learn through real-world projects.");
        dataScienceCourse.setInstructor("Krish Naik");
        dataScienceCourse.setThumbnailUrl("https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800");
        dataScienceCourse.setDuration("52h 30m");
        dataScienceCourse.setCategory(dataScience);
        dataScienceCourse.setSubscriptionType(SubscriptionType.PREMIUM);
        dataScienceCourse.setDifficulty(DifficultyLevel.Intermediate);
        dataScienceCourse.setStatus(CourseStatus.PUBLISHED);
        dataScienceCourse.setFeatured(true);
        dataScienceCourse.setRating(4.9);
        dataScienceCourse.setStudentsCount(48250);

        dataScienceCourse = courseRepository.save(dataScienceCourse);

        addDataScienceCurriculum(dataScienceCourse);
        
        //-----------------------------------------------
        
        Course pythonDS = new Course();
        pythonDS.setTitle("Python for Data Science");
        pythonDS.setDescription("Learn Python programming, NumPy, Pandas, and data manipulation techniques for Data Science.");
        pythonDS.setInstructor("Jose Portilla");
        pythonDS.setThumbnailUrl("https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800");
        pythonDS.setDuration("38h 20m");
        pythonDS.setCategory(dataScience);
        pythonDS.setSubscriptionType(SubscriptionType.FREE);
        pythonDS.setDifficulty(DifficultyLevel.Beginner);
        pythonDS.setStatus(CourseStatus.PUBLISHED);
        pythonDS.setFeatured(false);
        pythonDS.setRating(4.8);
        pythonDS.setStudentsCount(39200);

        pythonDS = courseRepository.save(pythonDS);

        addPythonDataScienceCurriculum(pythonDS);
        
        //---------------------------------------------
        
        Course machineLearning = new Course();
        machineLearning.setTitle("Machine Learning with Python");
        machineLearning.setDescription("Build Machine Learning models using Scikit-Learn, Regression, Classification and Clustering.");
        machineLearning.setInstructor("Andrew Ng");
        machineLearning.setThumbnailUrl("https://images.unsplash.com/photo-1507146153580-69a1fe6d8aa1?w=800");
        machineLearning.setDuration("45h 15m");
        machineLearning.setCategory(dataScience);
        machineLearning.setSubscriptionType(SubscriptionType.PREMIUM);
        machineLearning.setDifficulty(DifficultyLevel.Intermediate);
        machineLearning.setStatus(CourseStatus.PUBLISHED);
        machineLearning.setFeatured(true);
        machineLearning.setRating(4.9);
        machineLearning.setStudentsCount(52400);

        machineLearning = courseRepository.save(machineLearning);

        addMachineLearningCurriculum(machineLearning); 
        //-------------------------------------------
        
        Course ethicalHacking = new Course();
        ethicalHacking.setTitle("Ethical Hacking & Penetration Testing");
        ethicalHacking.setDescription("Learn ethical hacking, penetration testing, Kali Linux, Metasploit, Burp Suite, and real-world cybersecurity techniques.");
        ethicalHacking.setInstructor("Zaid Sabih");
        ethicalHacking.setThumbnailUrl("https://images.unsplash.com/photo-1510511459019-5dda7724fd87?w=800");
        ethicalHacking.setDuration("46h 20m");
        ethicalHacking.setCategory(cyber);
        ethicalHacking.setSubscriptionType(SubscriptionType.PREMIUM);
        ethicalHacking.setDifficulty(DifficultyLevel.Intermediate);
        ethicalHacking.setStatus(CourseStatus.PUBLISHED);
        ethicalHacking.setFeatured(true);
        ethicalHacking.setRating(4.9);
        ethicalHacking.setStudentsCount(42500);

        ethicalHacking = courseRepository.save(ethicalHacking);

        addEthicalHackingCurriculum(ethicalHacking);
        
        //------------------------------------------------
        
        Course networkSecurity = new Course();
        networkSecurity.setTitle("Network Security Fundamentals");
        networkSecurity.setDescription("Master firewalls, VPNs, IDS/IPS, Wireshark, TCP/IP, and network defense techniques.");
        networkSecurity.setInstructor("David Bombal");
        networkSecurity.setThumbnailUrl("https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800");
        networkSecurity.setDuration("34h 40m");
        networkSecurity.setCategory(cyber);
        networkSecurity.setSubscriptionType(SubscriptionType.PLUS);
        networkSecurity.setDifficulty(DifficultyLevel.Beginner);
        networkSecurity.setStatus(CourseStatus.PUBLISHED);
        networkSecurity.setFeatured(false);
        networkSecurity.setRating(4.8);
        networkSecurity.setStudentsCount(31800);

        networkSecurity = courseRepository.save(networkSecurity);

        addNetworkSecurityCurriculum(networkSecurity);
        //-----------------------------------------------------
        
        Course webSecurity = new Course();
        webSecurity.setTitle("Web Application Security & OWASP Top 10");
        webSecurity.setDescription("Learn web security, SQL Injection, XSS, CSRF, authentication, JWT security, and OWASP Top 10 vulnerabilities.");
        webSecurity.setInstructor("PortSwigger Academy");
        webSecurity.setThumbnailUrl("https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800");
        webSecurity.setDuration("38h 15m");
        webSecurity.setCategory(cyber);
        webSecurity.setSubscriptionType(SubscriptionType.PLUS);
        webSecurity.setDifficulty(DifficultyLevel.Intermediate);
        webSecurity.setStatus(CourseStatus.PUBLISHED);
        webSecurity.setFeatured(true);
        webSecurity.setRating(4.9);
        webSecurity.setStudentsCount(28600);

        webSecurity = courseRepository.save(webSecurity);

        addWebSecurityCurriculum(webSecurity);
        
        //----------------------------------------------------------
        
        Course forensics = new Course();
        forensics.setTitle("Digital Forensics & Incident Response");
        forensics.setDescription("Learn digital forensics, malware analysis, memory forensics, log analysis, and incident response techniques.");
        forensics.setInstructor("John Hammond");
        forensics.setThumbnailUrl("https://images.unsplash.com/photo-1563206767-5b18f218e8de?w=800");
        forensics.setDuration("29h 50m");
        forensics.setCategory(cyber);
        forensics.setSubscriptionType(SubscriptionType.PREMIUM);
        forensics.setDifficulty(DifficultyLevel.Advanced);
        forensics.setStatus(CourseStatus.PUBLISHED);
        forensics.setFeatured(false);
        forensics.setRating(4.8);
        forensics.setStudentsCount(18400);

        forensics = courseRepository.save(forensics);

        addForensicsCurriculum(forensics);
        
        //-------------------------------------------
        
        /*Course deepLearning = new Course();
        deepLearning.setTitle("Deep Learning with TensorFlow");
        deepLearning.setDescription("Master Neural Networks, TensorFlow, Keras, CNNs, RNNs, and Deep Learning projects.");
        deepLearning.setInstructor("Laurence Moroney");
        deepLearning.setThumbnailUrl("https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800");
        deepLearning.setDuration("49h 30m");
        deepLearning.setCategory(dataScience);
        deepLearning.setSubscriptionType(SubscriptionType.PREMIUM);
        deepLearning.setDifficulty(DifficultyLevel.Advanced);
        deepLearning.setStatus(CourseStatus.PUBLISHED);
        deepLearning.setFeatured(false);
        deepLearning.setRating(4.9);
        deepLearning.setStudentsCount(33100);

        deepLearning = courseRepository.save(deepLearning);

        addDeepLearningCurriculum(deepLearning);*/
        
        //----------------------------------------
        Course ios = new Course();
        ios.setTitle("iOS App Development with Swift");
        ios.setDescription("Build iPhone and iPad applications using Swift and Xcode.");
        ios.setInstructor("Angela Yu");
        ios.setThumbnailUrl("https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800");
        ios.setDuration("39h 20m");
        ios.setCategory(mobile);
        ios.setSubscriptionType(SubscriptionType.PREMIUM);
        ios.setDifficulty(DifficultyLevel.Intermediate);
        ios.setStatus(CourseStatus.PUBLISHED);
        ios.setFeatured(false);
        ios.setRating(4.9);
        ios.setStudentsCount(21400);

        ios = courseRepository.save(ios);

        addIosCurriculum(ios);
        
        //----------------------------------
        Course android = new Course();
        android.setTitle("Android App Development Masterclass");
        android.setDescription("Master modern Android development using Kotlin, Jetpack Compose, MVVM, Room and Firebase.");
        android.setInstructor("Google Android Team");
        android.setThumbnailUrl("https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?w=800");
        android.setDuration("48h 30m");
        android.setCategory(mobile);
        android.setSubscriptionType(SubscriptionType.PREMIUM);
        android.setDifficulty(DifficultyLevel.Advanced);
        android.setStatus(CourseStatus.PUBLISHED);
        android.setFeatured(true);
        android.setRating(4.9);
        android.setStudentsCount(32500);

        android = courseRepository.save(android);

        addAndroidCurriculum(android);
    }

 
    
    private void addReactCurriculum(Course course) {
        CourseSection s1 = sectionRepository.save(new CourseSection("Getting Started with React 18", 1, course));
        saveVideos(s1, List.of(
                new String[]{"Welcome & Course Overview",           "https://www.youtube.com/watch?v=SqcY0GlETPk", "5:20",  "true"},
                new String[]{"Setting Up the Development Env",     "https://www.youtube.com/watch?v=SqcY0GlETPk", "12:45", "true"},
                new String[]{"Your First React Component",         "https://www.youtube.com/watch?v=SqcY0GlETPk", "18:30", "false"},
                new String[]{"JSX In Depth",                       "https://www.youtube.com/watch?v=SqcY0GlETPk", "22:15", "false"}
        ));

        CourseSection s2 = sectionRepository.save(new CourseSection("React Hooks Mastery", 2, course));
        saveVideos(s2, List.of(
                new String[]{"useState and State Management",      "https://www.youtube.com/watch?v=SqcY0GlETPk", "25:10", "false"},
                new String[]{"useEffect and Side Effects",         "https://www.youtube.com/watch?v=SqcY0GlETPk", "30:45", "false"},
                new String[]{"useReducer for Complex State",       "https://www.youtube.com/watch?v=SqcY0GlETPk", "28:20", "false"},
                new String[]{"Building Custom Hooks",              "https://www.youtube.com/watch?v=SqcY0GlETPk", "35:00", "false"}
        ));

        CourseSection s3 = sectionRepository.save(new CourseSection("Advanced Patterns & Performance", 3, course));
        saveVideos(s3, List.of(
                new String[]{"React.memo and useMemo",             "https://www.youtube.com/watch?v=SqcY0GlETPk", "20:30", "false"},
                new String[]{"Code Splitting with Suspense",       "https://www.youtube.com/watch?v=SqcY0GlETPk", "18:45", "false"},
                new String[]{"Compound Component Pattern",         "https://www.youtube.com/watch?v=SqcY0GlETPk", "42:10", "false"}
        ));

        addReactQuiz(course);
    }
    
    private void addPythonDataScienceCurriculum(Course course) {

        CourseSection s1 = sectionRepository.save(
                new CourseSection("Python Fundamentals for Data Science", 1, course));

        saveVideos(s1, List.of(
                new String[]{"Introduction to Python", "https://www.youtube.com/watch?v=rfscVS0vtbw", "18:20", "true"},
                new String[]{"Variables, Data Types & Operators", "https://www.youtube.com/watch?v=rfscVS0vtbw", "25:40", "true"},
                new String[]{"Functions, Loops & Conditional Statements", "https://www.youtube.com/watch?v=rfscVS0vtbw", "34:10", "false"},
                new String[]{"Object-Oriented Programming in Python", "https://www.youtube.com/watch?v=rfscVS0vtbw", "28:15", "false"}
        ));

        CourseSection s2 = sectionRepository.save(
                new CourseSection("NumPy & Pandas Essentials", 2, course));

        saveVideos(s2, List.of(
                new String[]{"Introduction to NumPy", "https://www.youtube.com/watch?v=QUT1VHiLmmI", "22:30", "false"},
                new String[]{"NumPy Arrays & Operations", "https://www.youtube.com/watch?v=QUT1VHiLmmI", "31:45", "false"},
                new String[]{"Pandas DataFrames", "https://www.youtube.com/watch?v=vmEHCJofslg", "36:20", "false"},
                new String[]{"Cleaning & Transforming Data", "https://www.youtube.com/watch?v=vmEHCJofslg", "29:10", "false"}
        ));

        CourseSection s3 = sectionRepository.save(
                new CourseSection("Data Visualization & Mini Project", 3, course));

        saveVideos(s3, List.of(
                new String[]{"Matplotlib Tutorial", "https://www.youtube.com/watch?v=3Xc3CA655Y4", "24:20", "false"},
                new String[]{"Seaborn Crash Course", "https://www.youtube.com/watch?v=GcXcSZ0gQps", "27:30", "false"},
                new String[]{"Exploratory Data Analysis (EDA)", "https://www.youtube.com/watch?v=-o3AxdVcUtQ", "35:40", "false"},
                new String[]{"Python Data Science Mini Project", "https://www.youtube.com/watch?v=LHBE6Q9XlzI", "45:15", "false"}
        ));

        //addPythonQuiz(course);
    }
    
    private void addEthicalHackingCurriculum(Course course) {

        CourseSection s1 = sectionRepository.save(
                new CourseSection("Ethical Hacking Fundamentals", 1, course));

        saveVideos(s1, List.of(
                new String[]{"Introduction to Ethical Hacking", "https://www.youtube.com/watch?v=3Kq1MIfTWCE", "18:30", "true"},
                new String[]{"Setting Up Kali Linux", "https://www.youtube.com/watch?v=3Kq1MIfTWCE", "24:20", "true"},
                new String[]{"Linux Commands for Hackers", "https://www.youtube.com/watch?v=3Kq1MIfTWCE", "30:15", "false"},
                new String[]{"Networking Basics for Pentesting", "https://www.youtube.com/watch?v=qiQR5rTSshw", "35:10", "false"}
        ));

        CourseSection s2 = sectionRepository.save(
                new CourseSection("Penetration Testing Tools", 2, course));

        saveVideos(s2, List.of(
                new String[]{"Nmap Complete Guide", "https://www.youtube.com/watch?v=4t4kBkMsDbQ", "28:20", "false"},
                new String[]{"Wireshark Packet Analysis", "https://www.youtube.com/watch?v=lb1Dw0elw0Q", "32:10", "false"},
                new String[]{"Burp Suite for Beginners", "https://www.youtube.com/watch?v=2Q9b8YhWk0A", "36:45", "false"},
                new String[]{"Metasploit Framework Basics", "https://www.youtube.com/watch?v=8lR27r8Y_ik", "41:30", "false"}
        ));

        CourseSection s3 = sectionRepository.save(
                new CourseSection("Web & System Exploitation", 3, course));

        saveVideos(s3, List.of(
                new String[]{"SQL Injection Explained", "https://www.youtube.com/watch?v=ciNHn38EyRc", "27:15", "false"},
                new String[]{"Cross Site Scripting (XSS)", "https://www.youtube.com/watch?v=EoaDgUgS6QA", "25:50", "false"},
                new String[]{"Password Cracking with John the Ripper", "https://www.youtube.com/watch?v=9zVt6PTan8g", "30:25", "false"},
                new String[]{"Capture The Flag (CTF) Walkthrough", "https://www.youtube.com/watch?v=1AyxMbXZfKg", "48:40", "false"}
        ));

        // Uncomment after creating the quiz
        // addEthicalHackingQuiz(course);
    }
    
    private void addNetworkSecurityCurriculum(Course course) {

        CourseSection s1 = sectionRepository.save(
                new CourseSection("Networking Fundamentals", 1, course));

        saveVideos(s1, List.of(
                new String[]{"Introduction to Computer Networks", "https://www.youtube.com/watch?v=qiQR5rTSshw", "18:20", "true"},
                new String[]{"OSI Model Explained", "https://www.youtube.com/watch?v=vv4y_uOneC0", "24:15", "true"},
                new String[]{"TCP/IP Protocol Suite", "https://www.youtube.com/watch?v=TkCSr30UojM", "28:40", "false"},
                new String[]{"IP Addressing & Subnetting", "https://www.youtube.com/watch?v=5WfiTHiU4x8", "35:10", "false"}
        ));

        CourseSection s2 = sectionRepository.save(
                new CourseSection("Network Security Technologies", 2, course));

        saveVideos(s2, List.of(
                new String[]{"Firewalls Explained", "https://www.youtube.com/watch?v=kDEX1HXybrU", "26:40", "false"},
                new String[]{"Virtual Private Network (VPN)", "https://www.youtube.com/watch?v=_wQTRMBAvzg", "22:50", "false"},
                new String[]{"Intrusion Detection & Prevention Systems (IDS/IPS)", "https://www.youtube.com/watch?v=2R033KjM1z8", "31:30", "false"},
                new String[]{"Network Access Control (NAC)", "https://www.youtube.com/watch?v=8jQ8SrAP8rQ", "27:15", "false"}
        ));

        CourseSection s3 = sectionRepository.save(
                new CourseSection("Monitoring & Network Defense", 3, course));

        saveVideos(s3, List.of(
                new String[]{"Wireshark Packet Analysis", "https://www.youtube.com/watch?v=lb1Dw0elw0Q", "34:25", "false"},
                new String[]{"Nmap Network Scanning", "https://www.youtube.com/watch?v=4t4kBkMsDbQ", "29:30", "false"},
                new String[]{"Network Security Best Practices", "https://www.youtube.com/watch?v=Kx4y9c7w2gI", "25:20", "false"},
                new String[]{"Building a Secure Enterprise Network", "https://www.youtube.com/watch?v=qiQR5rTSshw", "46:15", "false"}
        ));

        // Uncomment after creating the quiz
        // addNetworkSecurityQuiz(course);
    }
    
    private void addWebSecurityCurriculum(Course course) {

        CourseSection s1 = sectionRepository.save(
                new CourseSection("OWASP Top 10 Fundamentals", 1, course));

        saveVideos(s1, List.of(
                new String[]{"Introduction to Web Application Security", "https://www.youtube.com/watch?v=WlmKwIe9z1Q", "18:30", "true"},
                new String[]{"Understanding OWASP Top 10", "https://www.youtube.com/watch?v=WlmKwIe9z1Q", "25:20", "true"},
                new String[]{"Broken Authentication", "https://www.youtube.com/watch?v=WlmKwIe9z1Q", "28:40", "false"},
                new String[]{"Security Misconfiguration", "https://www.youtube.com/watch?v=WlmKwIe9z1Q", "30:15", "false"}
        ));

        CourseSection s2 = sectionRepository.save(
                new CourseSection("Web Exploitation Techniques", 2, course));

        saveVideos(s2, List.of(
                new String[]{"SQL Injection", "https://www.youtube.com/watch?v=ciNHn38EyRc", "30:10", "false"},
                new String[]{"Cross Site Scripting (XSS)", "https://www.youtube.com/watch?v=EoaDgUgS6QA", "28:20", "false"},
                new String[]{"Cross Site Request Forgery (CSRF)", "https://www.youtube.com/watch?v=eWEgUcHPle0", "24:15", "false"},
                new String[]{"File Upload Vulnerabilities", "https://www.youtube.com/watch?v=WlmKwIe9z1Q", "27:30", "false"}
        ));

        CourseSection s3 = sectionRepository.save(
                new CourseSection("Security Testing & Hardening", 3, course));

        saveVideos(s3, List.of(
                new String[]{"Burp Suite Professional", "https://www.youtube.com/watch?v=2Q9b8YhWk0A", "35:20", "false"},
                new String[]{"Testing with DVWA", "https://www.youtube.com/watch?v=5k4WK8JKBDg", "32:10", "false"},
                new String[]{"JWT Authentication Security", "https://www.youtube.com/watch?v=7Q17ubqLfaM", "26:40", "false"},
                new String[]{"Web Application Security Best Practices", "https://www.youtube.com/watch?v=WlmKwIe9z1Q", "40:15", "false"}
        ));

        // addWebSecurityQuiz(course);
    }
    
    private void addForensicsCurriculum(Course course) {

        CourseSection s1 = sectionRepository.save(
                new CourseSection("Digital Forensics Fundamentals", 1, course));

        saveVideos(s1, List.of(
                new String[]{"Introduction to Digital Forensics", "https://www.youtube.com/watch?v=E6QqXfYvP6U", "18:40", "true"},
                new String[]{"Evidence Collection & Preservation", "https://www.youtube.com/watch?v=E6QqXfYvP6U", "25:30", "true"},
                new String[]{"Chain of Custody", "https://www.youtube.com/watch?v=E6QqXfYvP6U", "22:15", "false"},
                new String[]{"Forensic Investigation Process", "https://www.youtube.com/watch?v=E6QqXfYvP6U", "28:20", "false"}
        ));

        CourseSection s2 = sectionRepository.save(
                new CourseSection("Memory & Disk Forensics", 2, course));

        saveVideos(s2, List.of(
                new String[]{"Memory Forensics with Volatility", "https://www.youtube.com/watch?v=2F1tMkmMHJY", "35:10", "false"},
                new String[]{"Disk Image Analysis", "https://www.youtube.com/watch?v=2F1tMkmMHJY", "32:40", "false"},
                new String[]{"Autopsy Digital Forensics Tool", "https://www.youtube.com/watch?v=R8w6t5Jm6N4", "36:25", "false"},
                new String[]{"File System Analysis", "https://www.youtube.com/watch?v=2F1tMkmMHJY", "28:15", "false"}
        ));

        CourseSection s3 = sectionRepository.save(
                new CourseSection("Incident Response & Malware Analysis", 3, course));

        saveVideos(s3, List.of(
                new String[]{"Incident Response Lifecycle", "https://www.youtube.com/watch?v=7gV6n6QfM1E", "26:10", "false"},
                new String[]{"Malware Analysis Basics", "https://www.youtube.com/watch?v=7gV6n6QfM1E", "34:20", "false"},
                new String[]{"Windows Event Log Analysis", "https://www.youtube.com/watch?v=E6QqXfYvP6U", "30:50", "false"},
                new String[]{"Complete Digital Forensics Investigation", "https://www.youtube.com/watch?v=2F1tMkmMHJY", "48:40", "false"}
        ));

        // addForensicsQuiz(course);
    }
    
    private void addMachineLearningCurriculum(Course course) {

        CourseSection s1 = sectionRepository.save(
                new CourseSection("Machine Learning Fundamentals", 1, course));

        saveVideos(s1, List.of(
                new String[]{"Introduction to Machine Learning", "https://www.youtube.com/watch?v=7eh4d6sabA0", "18:40", "true"},
                new String[]{"Types of Machine Learning", "https://www.youtube.com/watch?v=7eh4d6sabA0", "25:30", "true"},
                new String[]{"Data Preprocessing", "https://www.youtube.com/watch?v=7eh4d6sabA0", "30:10", "false"},
                new String[]{"Feature Engineering", "https://www.youtube.com/watch?v=7eh4d6sabA0", "28:15", "false"}
        ));

        CourseSection s2 = sectionRepository.save(
                new CourseSection("Supervised Learning", 2, course));

        saveVideos(s2, List.of(
                new String[]{"Linear Regression", "https://www.youtube.com/watch?v=i_LwzRVP7bg", "35:20", "false"},
                new String[]{"Logistic Regression", "https://www.youtube.com/watch?v=i_LwzRVP7bg", "32:10", "false"},
                new String[]{"Decision Trees", "https://www.youtube.com/watch?v=i_LwzRVP7bg", "38:15", "false"},
                new String[]{"Random Forest", "https://www.youtube.com/watch?v=i_LwzRVP7bg", "34:50", "false"}
        ));

        CourseSection s3 = sectionRepository.save(
                new CourseSection("Unsupervised Learning & Projects", 3, course));

        saveVideos(s3, List.of(
                new String[]{"K-Means Clustering", "https://www.youtube.com/watch?v=4b5d3muPQmA", "27:30", "false"},
                new String[]{"Principal Component Analysis (PCA)", "https://www.youtube.com/watch?v=FgakZw6K1QQ", "31:45", "false"},
                new String[]{"Model Evaluation", "https://www.youtube.com/watch?v=85dtiMz9tSo", "24:15", "false"},
                new String[]{"End-to-End Machine Learning Project", "https://www.youtube.com/watch?v=7eh4d6sabA0", "52:30", "false"}
        ));

        // Uncomment only if you create this method
        // addMachineLearningQuiz(course);
    }
    
    private void addAndroidCurriculum(Course course) {

        CourseSection s1 = sectionRepository.save(
                new CourseSection("Jetpack Compose",1,course));

        saveVideos(s1,List.of(
                new String[]{"Compose Basics","https://www.youtube.com/watch?v=6_wK_Ud8--0","18:20","true"},
                new String[]{"Composable Functions","https://www.youtube.com/watch?v=6_wK_Ud8--0","26:40","true"},
                new String[]{"State Management","https://www.youtube.com/watch?v=6_wK_Ud8--0","24:30","false"}
        ));

        CourseSection s2 = sectionRepository.save(
                new CourseSection("Architecture",2,course));

        saveVideos(s2,List.of(
                new String[]{"MVVM","https://www.youtube.com/watch?v=6_wK_Ud8--0","30:15","false"},
                new String[]{"Room Database","https://www.youtube.com/watch?v=6_wK_Ud8--0","34:40","false"},
                new String[]{"Retrofit","https://www.youtube.com/watch?v=6_wK_Ud8--0","29:20","false"}
        ));

        CourseSection s3 = sectionRepository.save(
                new CourseSection("Production Apps",3,course));

        saveVideos(s3,List.of(
                new String[]{"Authentication","https://www.youtube.com/watch?v=6_wK_Ud8--0","36:30","false"},
                new String[]{"Firebase Integration","https://www.youtube.com/watch?v=6_wK_Ud8--0","32:15","false"},
                new String[]{"Play Store Deployment","https://www.youtube.com/watch?v=6_wK_Ud8--0","18:20","false"}
        ));
    }
    
    private void addDataScienceCurriculum(Course course) {

        CourseSection s1 = sectionRepository.save(
                new CourseSection("Python for Data Science", 1, course));

        saveVideos(s1, List.of(
                new String[]{"Introduction to Data Science", "https://www.youtube.com/watch?v=ua-CiDNNj30", "18:20", "true"},
                new String[]{"Python Basics for Data Science", "https://www.youtube.com/watch?v=LHBE6Q9XlzI", "35:15", "true"},
                new String[]{"NumPy Crash Course", "https://www.youtube.com/watch?v=QUT1VHiLmmI", "28:40", "false"}
        ));

        CourseSection s2 = sectionRepository.save(
                new CourseSection("Data Analysis with Pandas", 2, course));

        saveVideos(s2, List.of(
                new String[]{"Pandas Complete Tutorial", "https://www.youtube.com/watch?v=vmEHCJofslg", "42:10", "false"},
                new String[]{"Data Cleaning Techniques", "https://www.youtube.com/watch?v=RQ0KyOkLQJg", "31:25", "false"},
                new String[]{"Data Visualization using Matplotlib", "https://www.youtube.com/watch?v=3Xc3CA655Y4", "36:45", "false"}
        ));

        CourseSection s3 = sectionRepository.save(
                new CourseSection("Machine Learning Fundamentals", 3, course));

        saveVideos(s3, List.of(
                new String[]{"Introduction to Machine Learning", "https://www.youtube.com/watch?v=7eh4d6sabA0", "29:15", "false"},
                new String[]{"Regression & Classification", "https://www.youtube.com/watch?v=i_LwzRVP7bg", "41:10", "false"},
                new String[]{"Complete Data Science Project", "https://www.youtube.com/watch?v=4HKqjENq9OU", "58:30", "false"}
        ));
    }
    
    private void addIosCurriculum(Course course) {

        CourseSection s1 = sectionRepository.save(
                new CourseSection("Swift Fundamentals",1,course));

        saveVideos(s1,List.of(
                new String[]{"Introduction to Swift","https://www.youtube.com/watch?v=comQ1-x2a1Q","15:10","true"},
                new String[]{"Variables & Constants","https://www.youtube.com/watch?v=comQ1-x2a1Q","22:30","true"},
                new String[]{"Functions & Structs","https://www.youtube.com/watch?v=comQ1-x2a1Q","26:20","false"}
        ));

        CourseSection s2 = sectionRepository.save(
                new CourseSection("Building iOS Apps",2,course));

        saveVideos(s2,List.of(
                new String[]{"Xcode Basics","https://www.youtube.com/watch?v=comQ1-x2a1Q","18:45","false"},
                new String[]{"SwiftUI Views","https://www.youtube.com/watch?v=comQ1-x2a1Q","28:15","false"},
                new String[]{"Navigation","https://www.youtube.com/watch?v=comQ1-x2a1Q","25:30","false"}
        ));

        CourseSection s3 = sectionRepository.save(
                new CourseSection("Real World Project",3,course));

        saveVideos(s3,List.of(
                new String[]{"Networking","https://www.youtube.com/watch?v=comQ1-x2a1Q","35:00","false"},
                new String[]{"Core Data","https://www.youtube.com/watch?v=comQ1-x2a1Q","32:40","false"},
                new String[]{"Publishing to App Store","https://www.youtube.com/watch?v=comQ1-x2a1Q","20:10","false"}
        ));
    }

    private void addKotlinCurriculum(Course course) {

        CourseSection s1 = sectionRepository.save(
                new CourseSection("Kotlin Basics",1,course));

        saveVideos(s1,List.of(
                new String[]{"Introduction to Kotlin","https://www.youtube.com/watch?v=F9UC9DY-vIU","12:20","true"},
                new String[]{"Variables & Data Types","https://www.youtube.com/watch?v=F9UC9DY-vIU","20:15","true"},
                new String[]{"Functions & Classes","https://www.youtube.com/watch?v=F9UC9DY-vIU","25:40","false"}
        ));

        CourseSection s2 = sectionRepository.save(
                new CourseSection("Android Studio",2,course));

        saveVideos(s2,List.of(
                new String[]{"Installing Android Studio","https://www.youtube.com/watch?v=BBWyXo-3JGQ","18:15","false"},
                new String[]{"Layouts & Views","https://www.youtube.com/watch?v=BBWyXo-3JGQ","26:40","false"},
                new String[]{"Buttons & Navigation","https://www.youtube.com/watch?v=BBWyXo-3JGQ","24:30","false"}
        ));

        CourseSection s3 = sectionRepository.save(
                new CourseSection("Building Real Apps",3,course));

        saveVideos(s3,List.of(
                new String[]{"RecyclerView","https://www.youtube.com/watch?v=BBWyXo-3JGQ","28:30","false"},
                new String[]{"Room Database","https://www.youtube.com/watch?v=BBWyXo-3JGQ","32:10","false"},
                new String[]{"MVVM Architecture","https://www.youtube.com/watch?v=BBWyXo-3JGQ","38:00","false"}
        ));
    }
    
    private void addTailwindCurriculum(Course course) {

        CourseSection s1 = sectionRepository.save(
                new CourseSection("Getting Started with Tailwind CSS", 1, course));

        saveVideos(s1, List.of(
                new String[]{"Introduction to Tailwind CSS", "https://www.youtube.com/watch?v=ft30zcMlFao", "12:30", "true"},
                new String[]{"Installing Tailwind CSS", "https://www.youtube.com/watch?v=ft30zcMlFao", "18:10", "true"},
                new String[]{"Utility Classes", "https://www.youtube.com/watch?v=ft30zcMlFao", "20:45", "false"}
        ));

        CourseSection s2 = sectionRepository.save(
                new CourseSection("Layouts & Components", 2, course));

        saveVideos(s2, List.of(
                new String[]{"Flexbox & Grid", "https://www.youtube.com/watch?v=ft30zcMlFao", "22:20", "false"},
                new String[]{"Cards & Navigation", "https://www.youtube.com/watch?v=ft30zcMlFao", "26:10", "false"},
                new String[]{"Responsive Design", "https://www.youtube.com/watch?v=ft30zcMlFao", "24:35", "false"}
        ));

        CourseSection s3 = sectionRepository.save(
                new CourseSection("Real World Project", 3, course));

        saveVideos(s3, List.of(
                new String[]{"Building a Landing Page", "https://www.youtube.com/watch?v=ft30zcMlFao", "34:20", "false"},
                new String[]{"Dark Mode & Custom Themes", "https://www.youtube.com/watch?v=ft30zcMlFao", "28:15", "false"},
                new String[]{"Deploying the Project", "https://www.youtube.com/watch?v=ft30zcMlFao", "18:50", "false"}
        ));
    }
    
    private void addSpringCurriculum(Course course) {
        CourseSection s1 = sectionRepository.save(new CourseSection("Spring Boot Fundamentals", 1, course));
        saveVideos(s1, List.of(
                new String[]{"Introduction to Spring Boot 3",      "https://www.youtube.com/watch?v=9SGDpanrc8U", "8:30",  "true"},
                new String[]{"Project Setup with Initializr",      "https://www.youtube.com/watch?v=9SGDpanrc8U", "15:20", "true"},
                new String[]{"REST API Design Principles",         "https://www.youtube.com/watch?v=9SGDpanrc8U", "22:40", "false"}
        ));

        CourseSection s2 = sectionRepository.save(new CourseSection("Spring Security & JWT", 2, course));
        saveVideos(s2, List.of(
                new String[]{"Spring Security 6 Overview",         "https://www.youtube.com/watch?v=9SGDpanrc8U", "18:30", "false"},
                new String[]{"JWT Authentication from Scratch",    "https://www.youtube.com/watch?v=9SGDpanrc8U", "35:50", "false"},
                new String[]{"Role-Based Authorization",           "https://www.youtube.com/watch?v=9SGDpanrc8U", "28:10", "false"}
        ));
    }
    
    
    
    private void addAwsCurriculum(Course course) {

        CourseSection s1 = sectionRepository.save(
                new CourseSection("AWS Cloud Fundamentals", 1, course));

        saveVideos(s1, List.of(
                new String[]{"Introduction to AWS", "https://www.youtube.com/watch?v=3hLmDS179YE", "12:30", "true"},
                new String[]{"AWS Global Infrastructure", "https://www.youtube.com/watch?v=3hLmDS179YE", "18:20", "true"},
                new String[]{"EC2 & IAM Basics", "https://www.youtube.com/watch?v=3hLmDS179YE", "25:40", "false"}
        ));

        CourseSection s2 = sectionRepository.save(
                new CourseSection("Core AWS Services", 2, course));

        saveVideos(s2, List.of(
                new String[]{"Amazon S3", "https://www.youtube.com/watch?v=3hLmDS179YE", "20:10", "false"},
                new String[]{"Amazon RDS", "https://www.youtube.com/watch?v=3hLmDS179YE", "18:40", "false"},
                new String[]{"VPC & Security Groups", "https://www.youtube.com/watch?v=3hLmDS179YE", "30:15", "false"}
        ));
    }

    private void addAngularCurriculum(Course course) {

        CourseSection s1 = sectionRepository.save(
                new CourseSection("Getting Started with Angular", 1, course));

        saveVideos(s1, List.of(
                new String[]{"Introduction to Angular", "https://www.youtube.com/watch?v=3qBXWUpoPHo", "10:20", "true"},
                new String[]{"Installing Angular CLI", "https://www.youtube.com/watch?v=3qBXWUpoPHo", "15:40", "true"},
                new String[]{"Creating Your First Angular App", "https://www.youtube.com/watch?v=3qBXWUpoPHo", "22:15", "false"}
        ));

        CourseSection s2 = sectionRepository.save(
                new CourseSection("Components & Data Binding", 2, course));

        saveVideos(s2, List.of(
                new String[]{"Angular Components", "https://www.youtube.com/watch?v=3qBXWUpoPHo", "20:10", "false"},
                new String[]{"Property & Event Binding", "https://www.youtube.com/watch?v=3qBXWUpoPHo", "28:35", "false"},
                new String[]{"Directives in Angular", "https://www.youtube.com/watch?v=3qBXWUpoPHo", "26:45", "false"}
        ));

        CourseSection s3 = sectionRepository.save(
                new CourseSection("Routing & Services", 3, course));

        saveVideos(s3, List.of(
                new String[]{"Angular Routing", "https://www.youtube.com/watch?v=3qBXWUpoPHo", "30:15", "false"},
                new String[]{"Dependency Injection", "https://www.youtube.com/watch?v=3qBXWUpoPHo", "25:30", "false"},
                new String[]{"Building a Complete Angular Project", "https://www.youtube.com/watch?v=3qBXWUpoPHo", "40:20", "false"}
        ));
    }
    
    private void addDockerCurriculum(Course course) {

        CourseSection s1 = sectionRepository.save(
                new CourseSection("Docker Fundamentals", 1, course));

        saveVideos(s1, List.of(
                new String[]{"Introduction to Docker", "https://www.youtube.com/watch?v=fqMOX6JJhGo", "10:20", "true"},
                new String[]{"Installing Docker", "https://www.youtube.com/watch?v=fqMOX6JJhGo", "15:45", "true"},
                new String[]{"Docker Images & Containers", "https://www.youtube.com/watch?v=fqMOX6JJhGo", "28:30", "false"}
        ));

        CourseSection s2 = sectionRepository.save(
                new CourseSection("Kubernetes Basics", 2, course));

        saveVideos(s2, List.of(
                new String[]{"Introduction to Kubernetes", "https://www.youtube.com/watch?v=X48VuDVv0do", "18:15", "false"},
                new String[]{"Pods & Deployments", "https://www.youtube.com/watch?v=X48VuDVv0do", "30:10", "false"},
                new String[]{"Services & Ingress", "https://www.youtube.com/watch?v=X48VuDVv0do", "25:20", "false"}
        ));
    }
    
    private void addTypeScriptCurriculum(Course course) {

        CourseSection s1 = sectionRepository.save(
                new CourseSection("TypeScript Fundamentals", 1, course));

        saveVideos(s1, List.of(
                new String[]{"Introduction to TypeScript", "https://www.youtube.com/watch?v=30LWjhZzg50", "12:10", "true"},
                new String[]{"Installing TypeScript", "https://www.youtube.com/watch?v=30LWjhZzg50", "16:30", "true"},
                new String[]{"Types, Interfaces & Enums", "https://www.youtube.com/watch?v=30LWjhZzg50", "28:45", "false"}
        ));

        CourseSection s2 = sectionRepository.save(
                new CourseSection("Advanced TypeScript", 2, course));

        saveVideos(s2, List.of(
                new String[]{"Generics", "https://www.youtube.com/watch?v=30LWjhZzg50", "22:15", "false"},
                new String[]{"Decorators", "https://www.youtube.com/watch?v=30LWjhZzg50", "18:40", "false"},
                new String[]{"Utility Types", "https://www.youtube.com/watch?v=30LWjhZzg50", "24:35", "false"}
        ));
    }

    private void addNodeCurriculum(Course course) {

        CourseSection s1 = sectionRepository.save(
                new CourseSection("Node.js Fundamentals", 1, course));

        saveVideos(s1, List.of(
                new String[]{"Introduction to Node.js", "https://www.youtube.com/watch?v=TlB_eWDSMt4", "10:20", "true"},
                new String[]{"Modules & npm", "https://www.youtube.com/watch?v=TlB_eWDSMt4", "18:10", "true"},
                new String[]{"Creating Your First Server", "https://www.youtube.com/watch?v=TlB_eWDSMt4", "25:40", "false"}
        ));

        CourseSection s2 = sectionRepository.save(
                new CourseSection("Express.js APIs", 2, course));

        saveVideos(s2, List.of(
                new String[]{"Introduction to Express", "https://www.youtube.com/watch?v=L72fhGm1tfE", "20:10", "false"},
                new String[]{"REST API Development", "https://www.youtube.com/watch?v=L72fhGm1tfE", "30:20", "false"},
                new String[]{"JWT Authentication", "https://www.youtube.com/watch?v=L72fhGm1tfE", "28:45", "false"}
        ));
    }

    private void addPythonCurriculum(Course course) {
        CourseSection s1 = sectionRepository.save(new CourseSection("Python Fundamentals", 1, course));
        saveVideos(s1, List.of(
                new String[]{"Python Setup & Hello World",         "https://www.youtube.com/watch?v=rfscVS0vtbw", "6:15",  "true"},
                new String[]{"Variables, Types & Operators",       "https://www.youtube.com/watch?v=rfscVS0vtbw", "20:40", "true"},
                new String[]{"Lists, Dicts & Sets",                "https://www.youtube.com/watch?v=rfscVS0vtbw", "28:30", "false"},
                new String[]{"Functions & Lambdas",                "https://www.youtube.com/watch?v=rfscVS0vtbw", "32:15", "false"}
        ));

        CourseSection s2 = sectionRepository.save(new CourseSection("Machine Learning Fundamentals", 2, course));
        saveVideos(s2, List.of(
                new String[]{"Intro to NumPy & Pandas",            "https://www.youtube.com/watch?v=rfscVS0vtbw", "40:20", "false"},
                new String[]{"Linear Regression from Scratch",     "https://www.youtube.com/watch?v=rfscVS0vtbw", "45:30", "false"},
                new String[]{"Classification with Scikit-Learn",   "https://www.youtube.com/watch?v=rfscVS0vtbw", "38:45", "false"}
        ));
    }

    private void addHtmlCurriculum(Course course) {

        CourseSection s1 = sectionRepository.save(
                new CourseSection("HTML Fundamentals",1,course));

        saveVideos(s1,List.of(
                new String[]{"Introduction to HTML","https://www.youtube.com/watch?v=qz0aGYrrlhU","12:30","true"},
                new String[]{"HTML Elements","https://www.youtube.com/watch?v=qz0aGYrrlhU","18:45","true"},
                new String[]{"Forms and Tables","https://www.youtube.com/watch?v=qz0aGYrrlhU","22:15","false"}
        ));

        CourseSection s2 = sectionRepository.save(
                new CourseSection("CSS Styling",2,course));

        saveVideos(s2,List.of(
                new String[]{"CSS Selectors","https://www.youtube.com/watch?v=1Rs2ND1ryYc","20:10","false"},
                new String[]{"Flexbox","https://www.youtube.com/watch?v=JJSoEo8JSnc","28:30","false"},
                new String[]{"CSS Grid","https://www.youtube.com/watch?v=9zBsdzdE4sM","30:15","false"}
        ));

        CourseSection s3 = sectionRepository.save(
                new CourseSection("Responsive Website Project",3,course));

        saveVideos(s3,List.of(
                new String[]{"Building Landing Page","https://www.youtube.com/watch?v=G3e-cpL7ofc","35:20","false"},
                new String[]{"Responsive Design","https://www.youtube.com/watch?v=G3e-cpL7ofc","26:40","false"},
                new String[]{"Deploy Website","https://www.youtube.com/watch?v=G3e-cpL7ofc","18:00","false"}
        ));
    }
    private void saveVideos(CourseSection section, List<String[]> data) {
        for (int i = 0; i < data.size(); i++) {
            String[] v = data.get(i);
            videoRepository.save(new Video(v[0], v[1], v[2], i + 1, Boolean.parseBoolean(v[3]), section));
        }
    }

    private void addReactQuiz(Course course) {
        Quiz quiz = new Quiz("React 18 Final Assessment", 600, 70, course);
        quiz = quizRepository.save(quiz);

        Object[][] questions = {
            {"Which hook runs code after a component renders?",
             new String[]{"useState","useEffect","useCallback","useMemo"}, 1},
            {"What does React.memo() do?",
             new String[]{"Creates selectors","Memoizes return value","Prevents re-renders when props unchanged","Caches API"}, 2},
            {"How to define a URL param in React Router v6?",
             new String[]{"path=\"/user/:id\"","path=\"/user/{id}\"","path=\"/user/[id]\"","path=\"/user/$id\""}, 0},
            {"What is Context API for?",
             new String[]{"Replacing local state","Passing data without prop drilling","External state management","Side effects"}, 1},
            {"What does useCallback return?",
             new String[]{"A memoized value","A memoized callback","A ref object","A state updater"}, 1},
        };

        for (int i = 0; i < questions.length; i++) {
            Question q = new Question(
                    (String) questions[i][0],
                    (Integer) questions[i][2],
                    i + 1,
                    quiz,
                    List.of((String[]) questions[i][1])
            );
            quiz.getQuestions().add(q);
        }
        quizRepository.save(quiz);
    }
}
