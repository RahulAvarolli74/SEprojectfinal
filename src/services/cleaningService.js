import api from '../utils/axiosConfig';

export const cleaningService = {
  submitCleaning: async (data) => {
    const formData = new FormData();
    // Maps frontend 'workerId' to backend 'worker'
    formData.append('worker', data.workerId);
    
    // Handle array of cleaning types
    if (Array.isArray(data.cleaningTypes)) {
        data.cleaningTypes.forEach(type => {
            formData.append('cleaningType', type);
        });
    }

    if (data.feedback) formData.append('feedback', data.feedback);
    if (data.image) formData.append('image', data.image);

    const response = await api.post('/students/submit-cleaning', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  getStudentHistory: async (params = {}) => {
    const response = await api.get('/students/history', { params });
    return response.data;
  },

  getAllCleaningLogs: async (params = {}) => {
    const response = await api.get('/admin/logs', { params });
    return response.data;
  },

  getStatistics: async (params = {}) => {
    const response = await api.get('/admin/workers-stats', { params });
    return response.data;
  },

  getCleaningById: async (id) => {
    const response = await api.get(`/students/history/${id}`);
    return response.data;
  },
};

export default cleaningService;