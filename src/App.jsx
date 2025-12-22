import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import { StudentLayout, AdminLayout } from './components/layout';
import { Toast } from './components/common';

// Auth Pages
import LandingPage from './pages/LandingPage';
import StudentLogin from './pages/auth/StudentLogin';
import AdminLogin from './pages/auth/AdminLogin';
import LoginPage from './pages/auth/LoginPage';

// Student Pages
import {
  StudentDashboard,
  SubmitCleaning,
  CleaningHistory,
  RaiseIssue,
  MyIssues,
} from './pages/student';

// Admin Pages
import {
  AdminDashboard,
  WorkerManagement,
  CleaningLogs,
  IssueManagement,
  CreateRoom,
} from './pages/admin';

import Lenis from 'lenis'
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    const lenis = new Lenis()

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])

  return (
    <AuthProvider>
      <Router>
        <Toast />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login/student" element={<StudentLogin />} />
          <Route path="/login/admin" element={<AdminLogin />} />
          <Route path="/login" element={<LoginPage />} />

          {/* Student Routes */}
          <Route
            path="/student"
            element={
              <ProtectedRoute allowedRoles={['STUDENT']}>
                <StudentLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<StudentDashboard />} />
            <Route path="submit-cleaning" element={<SubmitCleaning />} />
            <Route path="history" element={<CleaningHistory />} />
            <Route path="raise-issue" element={<RaiseIssue />} />
            <Route path="my-issues" element={<MyIssues />} />
          </Route>

          {/* Admin Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={['ADMIN']}>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="workers" element={<WorkerManagement />} />
            <Route path="cleaning-logs" element={<CleaningLogs />} />
            <Route path="issues" element={<IssueManagement />} />
            <Route path="create-room" element={<CreateRoom />} />
          </Route>

          {/* Catch all - redirect to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
