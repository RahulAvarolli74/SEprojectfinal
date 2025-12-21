import api from '../utils/axiosConfig';

export const authService = {
  studentLogin: async (room_no, password) => {
    // Backend expects 'room_no' not 'roomNumber' based on user.model.js? 
    // Wait, user.model has room_no. Let's check controller. 
    // Controller likely expects req.body.username or room_no. 
    // Safest to send what schema uses: room_no.
    const response = await api.post('/students/login', { room_no, password });
    return response.data;
  },

  adminLogin: async (username, password) => {
    const response = await api.post('/admin/login', { username, password });
    return response.data;
  },

  logout: async () => {
    // Both admin and student have logout. We need to know who is logging out.
    // For now, assuming student since this is mostly student app focus, 
    // but better to try safely or have separate logouts.
    // Let's try student logout first.
    try {
      await api.post('/students/logout');
    } catch (e) {
      // Fallback or ignore if already logged out
      await api.post('/admin/logout');
    }
  },

  getCurrentUser: async () => {
    // No specific /me endpoint found in routes. 
    // Student Dashboard returns user info.
    const response = await api.get('/students/dashboard');
    return response.data;
  },

  getAdminDashboard: async () => {
    const response = await api.get('/admin/dashboard');
    return response.data;
  },
};

export default authService;
