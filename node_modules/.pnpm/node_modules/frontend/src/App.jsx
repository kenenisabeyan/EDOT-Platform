import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import CoursesPage from './pages/CoursesPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import PaymentsPage from './pages/PaymentsPage';
import ProfilePage from './pages/ProfilePage';
import QuizPage from './pages/QuizPage';
import AttendancePage from './pages/AttendancePage';
import ManageSectionsPage from './pages/ManageSectionsPage';

import CourseDetailPage from './pages/CourseDetailPage';
import LessonPage from './pages/LessonPage';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/courses/:id" element={<CourseDetailPage />} />
        <Route path="/lessons/:courseId" element={<LessonPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />

        {/* Protected Dashboard Routes */}
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/payments" element={<PaymentsPage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/attendance" element={<AttendancePage />} />
        <Route path="/manage-sections" element={<ManageSectionsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
