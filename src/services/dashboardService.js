import api from '../utils/axiosConfig';

export const dashboardService = {
  // Get student dashboard data
  getStudentDashboard: async () => {
    const response = await api.get('/dashboard/student');
    return response.data;
  },

  // Get admin dashboard data
  getAdminDashboard: async () => {
    const response = await api.get('/dashboard/admin');
    return response.data;
  },

  // Get chart data for admin
  getChartData: async (type, params = {}) => {
    const response = await api.get(`/dashboard/charts/${type}`, { params });
    return response.data;
  },
};

export default dashboardService;
