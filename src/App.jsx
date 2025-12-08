import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import { StudentLayout, AdminLayout } from './components/layout';
import { Toast } from './components/common';

// Auth Pages
import LandingPage from './pages/LandingPage';
import StudentLogin from './pages/auth/StudentLogin';
import AdminLogin from './pages/auth/AdminLogin';

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
} from './pages/admin';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Toast />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login/student" element={<StudentLogin />} />
          <Route path="/login/admin" element={<AdminLogin />} />

          {/* Student Routes */}
          <Route
            path="/student"
            element={
              <ProtectedRoute allowedRoles={['student']}>
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
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="workers" element={<WorkerManagement />} />
            <Route path="cleaning-logs" element={<CleaningLogs />} />
            <Route path="issues" element={<IssueManagement />} />
          </Route>

          {/* Catch all - redirect to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
