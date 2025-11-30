import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';
import useAuthStore from './store/authStore';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Layout from './layouts/Layout';
import EmployeeDashboard from './pages/Employee/Dashboard';
import ManagerDashboard from './pages/Manager/Dashboard';
import MarkAttendance from './pages/Employee/MarkAttendance';
import History from './pages/Employee/History';
import Profile from './pages/Employee/Profile';
import AllEmployees from './pages/Manager/AllEmployees';
import Reports from './pages/Manager/Reports';
import NotFound from './pages/NotFound';
import Home from './pages/Home';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuthStore();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

// Role Based Route Component
const RoleRoute = ({ children, role }) => {
  const { user } = useAuthStore();
  if (!user) return <Navigate to="/login" />;
  return user.role === role ? children : <Navigate to="/" />;
};

function App() {
  const { checkAuth, user, isLoading } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <Router>
      <Toaster position="top-right" />
      <Routes>


        {/* ... imports */}

        <Route path="/" element={!user ? <Home /> : <Navigate to="/dashboard" />} />
        <Route path="/login/employee" element={!user ? <Login role="employee" /> : <Navigate to="/dashboard" />} />
        <Route path="/login/manager" element={!user ? <Login role="manager" /> : <Navigate to="/dashboard" />} />
        <Route path="/login" element={<Navigate to="/" />} />
        <Route path="/register" element={!user ? <Register /> : <Navigate to="/dashboard" />} />

        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }>
          <Route index element={
            user?.role === 'manager' ? <ManagerDashboard /> : <EmployeeDashboard />
          } />

          {/* Employee Routes */}
          <Route path="mark-attendance" element={<MarkAttendance />} />
          <Route path="history" element={<History />} />
          <Route path="profile" element={<Profile />} />

          {/* Manager Routes */}
          <Route path="employees" element={
            <RoleRoute role="manager">
              <AllEmployees />
            </RoleRoute>
          } />
          <Route path="reports" element={
            <RoleRoute role="manager">
              <Reports />
            </RoleRoute>
          } />
        </Route>

        {/* 404 Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
