import api from '../utils/axiosConfig';

export const authService = {
  studentLogin: async (roomNumber, password) => {
    const response = await api.post('/auth/student/login', { roomNumber, password });
    return response.data;
  },

  adminLogin: async (username, password) => {
    const response = await api.post('/auth/admin/login', { username, password });
    return response.data;
  },

  logout: async () => {
    const response = await api.post('/auth/logout');
    return response.data;
  },

  getCurrentUser: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  },
};

export default authService;
