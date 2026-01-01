import { createContext, useContext, useState, useEffect } from 'react';
import api from '../utils/axiosConfig';
import { authService } from '../services';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const loginStudent = async (roomNumber, password) => {
    try {
      const data = await authService.studentLogin(roomNumber, password);
      // data: { user, accessToken, refreshToken } from backend
      localStorage.setItem('token', data.data.accessToken);
      localStorage.setItem('user', JSON.stringify(data.data.user));
      setUser(data.data.user);
      return { success: true };
    } catch (error) {
      console.error("Login failed", error);
      const errorMessage = error.response?.data?.message || error.message || "Login failed";
      return { success: false, error: errorMessage };
    }
  };

  const loginAdmin = async (username, password) => {
    try {
      const data = await authService.adminLogin(username, password);
      localStorage.setItem('token', data.data.accessToken);
      localStorage.setItem('user', JSON.stringify(data.data.user));
      setUser(data.data.user);
      return { success: true };
    } catch (error) {
      console.error("Admin Login failed", error);
      const errorMessage = error.response?.data?.message || error.message || "Login failed";
      return { success: false, error: errorMessage };
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch (err) {
      console.error("Logout error", err);
    }
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  const value = {
    user,
    loading,
    loginStudent,
    loginAdmin,
    logout,
    isAuthenticated: !!user,
    isStudent: user?.role === 'student',
    isAdmin: user?.role === 'admin',
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
