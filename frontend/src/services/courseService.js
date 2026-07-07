import api from "./api";

export const courseService = {
  getAll: (params) => api.get("/courses", { params }),
  getById: (id) => api.get(`/courses/${id}`),
  getFeatured: () => api.get("/courses/featured"),
  getByCategory: (categoryId, params) =>
    api.get(`/courses/category/${categoryId}`, { params }),
  enroll: (courseId) => api.post(`/courses/${courseId}/enroll`),
  getEnrolled: () => api.get("/courses/enrolled"),
  search: (query) => api.get("/courses/search", { params: { q: query } }),
};

export const categoryService = {
  getAll: () => api.get("/categories"),
  getById: (id) => api.get(`/categories/${id}`),
};

export const videoService = {
  getByCourse: (courseId) => api.get(`/courses/${courseId}/videos`),
  markComplete: (videoId) => api.post(`/videos/${videoId}/complete`),
};

export const progressService = {
  getCourseProgress: (courseId) => api.get(`/progress/course/${courseId}`),
  getUserProgress: () => api.get("/progress/me"),
};

export const subscriptionService = {
  getPlans: () => api.get("/subscriptions/plans"),
  getCurrent: () => api.get("/subscriptions/current"),
  subscribe: (planId) => api.post("/subscriptions/subscribe", { planId }),
};

export const quizService = {
  getByCourse: (courseId) => api.get(`/courses/${courseId}/quiz`),
  submit: (quizId, answers) => api.post(`/quiz/${quizId}/submit`, { answers }),
  getResult: (quizId) => api.get(`/quiz/${quizId}/result`),
};

export const certificateService = {
  getByCourse: (courseId) => api.get(`/certificates/course/${courseId}`),
  getAll: () => api.get("/certificates"),
  download: (certificateId) =>
    api.get(`/certificates/${certificateId}/download`, {
      responseType: "blob",
    }),
};

export const adminService = {
  getStats: () => api.get("/admin/stats"),
  getUsers: (params) => api.get("/admin/users", { params }),
  createCourse: (data) => api.post("/admin/courses", data),
  updateCourse: (id, data) => api.put(`/admin/courses/${id}`, data),
  deleteCourse: (id) => api.delete(`/admin/courses/${id}`),
  createVideo: (courseId, data) =>
    api.post(`/admin/courses/${courseId}/videos`, data),
  updateVideo: (id, data) => api.put(`/admin/videos/${id}`, data),
  deleteVideo: (id) => api.delete(`/admin/videos/${id}`),
  createQuiz: (courseId, data) =>
    api.post(`/admin/courses/${courseId}/quiz`, data),
  updateUser: (id, data) => api.put(`/admin/users/${id}`, data),
};
