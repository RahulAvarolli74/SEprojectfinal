import api from '../utils/axiosConfig';

export const authService = {
  studentLogin: async (room_no, password) => {
    
    const response = await api.post('/students/login', { room_no, password });
    return response.data;
  },

  adminLogin: async (username, password) => {
    const response = await api.post('/admin/login', { username, password });
    return response.data;
  },

  logout: async () => {
    
    try {
      await api.post('/students/logout');
    } catch (e) {
      await api.post('/admin/logout');
    }
  },

  getCurrentUser: async () => {
    const response = await api.get('/students/dashboard');
    return response.data;
  },

  getAdminDashboard: async () => {
    const response = await api.get('/admin/dashboard');
    return response.data;
  },
};

export default authService;
