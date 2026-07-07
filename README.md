# LearnFlow — Full-Stack Learning Platform (No Lombok)

A complete subscription-based e-learning platform built with **Spring Boot 3** (backend) and **React 18 + Tailwind CSS** (frontend). Zero Lombok dependency — all Java written with standard getters/setters/constructors.

---

## Project Structure

```
learnflow-backend/
│
├── src/                          ← Spring Boot Backend (Java 21)
│   └── main/java/com/learnflow/
│       ├── config/               SecurityConfig, DataSeeder, OpenApiConfig
│       ├── controller/           9 REST controllers
│       ├── dto/request/          AuthRequest, CourseRequest
│       ├── dto/response/         12 response DTOs
│       ├── entity/               12 JPA entities (no Lombok)
│       ├── enums/                Role, SubscriptionType, DifficultyLevel...
│       ├── exception/            GlobalExceptionHandler + custom exceptions
│       ├── repository/           11 Spring Data JPA repos
│       ├── security/             JWT filter, utils, UserDetails
│       └── service/              9 business services
├── pom.xml                       Maven build (NO Lombok)
│
└── frontend/                     ← React 18 + Tailwind CSS Frontend
    ├── public/
    ├── src/
    │   ├── components/           Navbar, CourseCard, Hero, Pricing...
    │   ├── context/              AuthContext (JWT)
    │   ├── hooks/                useFetch, useTimer, useSearch...
    │   ├── layouts/              MainLayout, DashboardLayout, AdminLayout
    │   ├── pages/                Landing, Courses, Learning, Quiz, Certificate...
    │   ├── routes/               AppRouter with protected routes
    │   ├── services/             Axios API service layer
    │   ├── styles/               Global CSS + Tailwind utilities
    │   └── utils/                Helpers (YouTube embed, formatters)
    ├── package.json
    ├── tailwind.config.js
    └── .env                      Points to http://localhost:8080/api
```

---

## Quick Start

### Prerequisites
- Java 21
- Node.js 18+
- MySQL 8
- Maven 3.9+

---

### Step 1 — Create Database
```sql
CREATE DATABASE learnflow_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

---

### Step 2 — Configure Backend

Edit `src/main/resources/application.properties`:
```properties
spring.datasource.username=root
spring.datasource.password=your_password
app.jwt.secret=your-256-bit-secret-change-in-production!!
app.cors.allowed-origins=http://localhost:3000
```

---

### Step 3 — Start Backend

```bash
# From project root (learnflow-backend/)
mvn spring-boot:run
```

API starts at: **http://localhost:8080/api**

On first run, the database is automatically seeded with demo data.

---

### Step 4 — Start Frontend

```bash
cd frontend
npm install
npm start
```

Frontend runs at: **http://localhost:3000**

---

## Demo Accounts

| Role  | Email                 | Password   |
|-------|-----------------------|------------|
| Admin | admin@learnflow.com   | Admin@123  |
| User  | user@learnflow.com    | User@123   |

---

## What Gets Seeded on First Run
- 2 users (Admin + Demo user with PLUS subscription)
- 8 categories (Web Dev, Backend, AI & ML, Cloud & DevOps...)
- 7 courses with full curriculum (YouTube video lessons)
- 1 quiz with 5 questions (for the React course)

---

## Tech Stack

### Backend
| Technology       | Version | Purpose             |
|------------------|---------|---------------------|
| Java             | 21      | Language            |
| Spring Boot      | 3.2     | Framework           |
| Spring Security  | 6       | Auth + JWT          |
| Spring Data JPA  | 3.2     | ORM                 |
| Hibernate        | 6       | SQL dialect         |
| MySQL            | 8       | Database            |
| jjwt             | 0.12    | JWT tokens          |
| SpringDoc OpenAPI| 2.3     | Swagger UI          |
| Maven            | 3.9     | Build               |

### Frontend
| Technology       | Version | Purpose             |
|------------------|---------|---------------------|
| React            | 18      | UI framework        |
| React Router DOM | 6       | Client-side routing |
| Tailwind CSS     | 3       | Styling             |
| Framer Motion    | 11      | Animations          |
| Axios            | 1.6     | HTTP client         |
| react-hot-toast  | 2.4     | Notifications       |
| react-icons      | 5       | Icons               |

---

## API Endpoints

### Public
| Method | Endpoint | Description |
|---|---|---|
| POST | `/auth/register` | Register |
| POST | `/auth/login` | Login → JWT |
| GET  | `/courses` | Browse courses (search/filter/paginate) |
| GET  | `/courses/featured` | Featured courses |
| GET  | `/courses/{id}` | Course detail + curriculum |
| GET  | `/categories` | All categories |
| GET  | `/subscriptions/plans` | Plan list |
| GET  | `/certificates/verify/{certId}` | Verify certificate |

### Protected (Bearer JWT)
| Method | Endpoint | Description |
|---|---|---|
| GET  | `/auth/me` | Current user |
| POST | `/courses/{id}/enroll` | Enroll |
| GET  | `/courses/enrolled` | My courses |
| POST | `/videos/{id}/complete` | Mark lesson done |
| GET  | `/progress/course/{id}` | Course progress |
| GET  | `/courses/{id}/quiz` | Get quiz |
| POST | `/quiz/{id}/submit` | Submit answers |
| GET  | `/certificates` | My certificates |
| GET  | `/subscriptions/current` | My plan |
| POST | `/subscriptions/subscribe` | Subscribe |

### Admin Only
| Method | Endpoint | Description |
|---|---|---|
| GET    | `/admin/stats` | Analytics dashboard |
| GET    | `/admin/users` | All users |
| PUT    | `/admin/users/{id}` | Ban/unban user |
| POST   | `/admin/courses` | Create course |
| PUT    | `/admin/courses/{id}` | Update course |
| DELETE | `/admin/courses/{id}` | Delete course |
| POST   | `/admin/courses/{id}/videos` | Add video |
| PUT    | `/admin/videos/{id}` | Update video |
| DELETE | `/admin/videos/{id}` | Delete video |
| POST   | `/admin/courses/{id}/quiz` | Create quiz |
| DELETE | `/admin/quizzes/{id}` | Delete quiz |
| POST   | `/admin/categories` | Create category |

---

## Swagger UI
**http://localhost:8080/api/swagger-ui.html**

---

## Features

### User
- Register / Login with JWT
- Browse & search courses with filters
- Enroll in FREE, PLUS, PREMIUM courses
- Watch YouTube-embedded video lessons
- Track lesson completion & course progress
- Take timed multiple-choice quizzes
- Download professional certificates
- Manage subscription plan

### Admin
- Analytics dashboard (users, revenue, subscriptions)
- Full Course CRUD with status management
- Add YouTube video lessons
- Create quizzes with multiple choice questions
- User management (search, ban/unban)
- Category management

### UI
- Glassmorphism dark theme (navy/indigo/violet)
- Responsive for mobile, tablet, desktop
- Framer Motion animations
- Toast notifications
- Loading skeletons
- Protected routes (user + admin guards)
