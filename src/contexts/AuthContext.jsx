import { createContext, useContext, useState, useEffect } from 'react';
import api from '../utils/axiosConfig';

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
    // Mock authentication - bypass API until backend is ready
    const mockUser = {
      id: '1',
      name: 'jndjsr',
      roomNumber: roomNumber || '101',
      email: 'student@demo.com',
      role: 'student'
    };
    
    localStorage.setItem('token', 'mock-student-token');
    localStorage.setItem('user', JSON.stringify(mockUser));
    setUser(mockUser);
    
    return { success: true };
  };

  const loginAdmin = async (username, password) => {
    // Mock authentication - bypass API until backend is ready
    const mockUser = {
      id: '1',
      name: 'Admin',
      username: username || 'admin',
      email: 'admin@demo.com',
      role: 'admin'
    };
    
    localStorage.setItem('token', 'mock-admin-token');
    localStorage.setItem('user', JSON.stringify(mockUser));
    setUser(mockUser);
    
    return { success: true };
  };

  const logout = () => {
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
