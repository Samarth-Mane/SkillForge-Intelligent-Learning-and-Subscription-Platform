# LearnFlow — Frontend

A professional subscription-based learning platform frontend built with React 18 + Tailwind CSS.

## Stack

- **React 18** + React Router DOM v6
- **Tailwind CSS** (custom design tokens: navy/indigo/violet/cyan theme)
- **Framer Motion** (animations)
- **Axios** (API calls with JWT interceptors)
- **react-hot-toast** (notifications)
- **react-icons**

## Setup

```bash
npm install
npm start
```

The app runs on `http://localhost:3000` and proxies API calls to `http://localhost:8080/api`.

## Module Status

| Module | Status |
|---|---|
| Project setup, Tailwind config | ✅ Done |
| Navbar + Footer | ✅ Done |
| Landing Page (all sections) | ✅ Done |
| Auth pages (Login, Register, ForgotPW) | ✅ Done |
| Route structure + guards | ✅ Done |
| Auth Context + JWT handling | ✅ Done |
| All API services (Axios) | ✅ Done |
| Dashboard & Sidebar layouts | ✅ Done |
| Course Catalog page | 🔜 Next |
| Course Detail + YouTube player | 🔜 Next |
| Learning Dashboard | 🔜 Next |
| Quiz Module | 🔜 Next |
| Certificate Generator | 🔜 Next |
| Admin Dashboard (full) | 🔜 Next |

## Folder Structure

```
src/
├── components/
│   ├── common/       # Navbar, Footer, LoadingScreen
│   ├── landing/      # Hero, Categories, FeaturedCourses, Pricing, Testimonials
│   ├── course/       # CourseCard (reusable)
│   ├── auth/
│   ├── dashboard/
│   ├── admin/
│   ├── quiz/
│   └── certificate/
├── pages/
│   ├── auth/         # LoginPage, RegisterPage, ForgotPasswordPage
│   ├── dashboard/    # UserDashboard
│   ├── admin/        # AdminDashboard
│   └── LandingPage
├── layouts/          # MainLayout, DashboardLayout, AdminLayout
├── routes/           # AppRouter with guards
├── services/         # api.js, authService.js, courseService.js
├── context/          # AuthContext (JWT)
├── styles/           # index.css (Tailwind + glass utilities)
└── App.jsx
```

## Environment Variables

Create `.env` in the root:

```
REACT_APP_API_URL=http://localhost:8080/api
```

## Design System

- **Colors:** Navy 900 bg, Indigo 500 primary, Violet 500 accent, Cyan 500 highlight
- **Glass cards:** `bg-white/5 backdrop-blur-md border border-white/10`
- **Gradient text:** `bg-gradient-to-r from-indigo-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent`
- **Typography:** Sora (display/headings) + Inter (body)
