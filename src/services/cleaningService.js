import api from '../utils/axiosConfig';

export const cleaningService = {
  // Submit a cleaning report
  submitCleaning: async (data) => {
    const formData = new FormData();
    formData.append('workerId', data.workerId);
    formData.append('cleaningTypes', JSON.stringify(data.cleaningTypes));
    if (data.feedback) formData.append('feedback', data.feedback);
    if (data.image) formData.append('image', data.image);

    const response = await api.post('/cleaning/submit', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  // Get cleaning history for a student
  getStudentHistory: async (params = {}) => {
    const response = await api.get('/cleaning/history', { params });
    return response.data;
  },

  // Get all cleaning logs (admin)
  getAllCleaningLogs: async (params = {}) => {
    const response = await api.get('/cleaning/logs', { params });
    return response.data;
  },

  // Get cleaning statistics
  getStatistics: async (params = {}) => {
    const response = await api.get('/cleaning/statistics', { params });
    return response.data;
  },

  // Get single cleaning record
  getCleaningById: async (id) => {
    const response = await api.get(`/cleaning/${id}`);
    return response.data;
  },
};

export default cleaningService;
