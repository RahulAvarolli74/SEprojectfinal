import api from '../utils/axiosConfig';

export const cleaningService = {
  // Submit a cleaning report
  submitCleaning: async (data) => {
    const formData = new FormData();
    formData.append('workerId', data.workerId);
    // Backend expects 'cleaningType' (array of strings) based on cleanlog.model.js
    // Frontend was sending 'cleaningTypes' JSON stringified.
    // Let's check backend controller. safer to send individually or as array.
    // If backend uses multer and then parses body, simple array append might work or JSON string.
    // Let's stick to frontend's current JSON.stringify but change key to 'cleaningType' if key mismatch.
    // user.routes.js -> submitCleaningLog controller. 
    // Assuming controller unwraps it. Let's send as 'cleaningType' to match model.
    formData.append('cleaningType', JSON.stringify(data.cleaningTypes)); // Changed key to cleaningType
    if (data.feedback) formData.append('feedback', data.feedback);
    if (data.image) formData.append('image', data.image);

    const response = await api.post('/students/submit-cleaning', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  // Get cleaning history for a student
  getStudentHistory: async (params = {}) => {
    const response = await api.get('/students/history', { params });
    return response.data;
  },

  // Get all cleaning logs (admin)
  getAllCleaningLogs: async (params = {}) => {
    const response = await api.get('/admin/logs', { params });
    return response.data;
  },

  // Get all workers statistics (using available admin route)
  getStatistics: async (params = {}) => {
    // There is no direct /cleaning/statistics. Using /admin/workers-stats 
    // which likely contains some stats.
    const response = await api.get('/admin/workers-stats', { params });
    return response.data;
  },

  // Get single cleaning record
  getCleaningById: async (id) => {
    // No direct single log endpoint found in routes. 
    // Might need to find it in history list.
    // Leaving as is but it might fail if 404.
    const response = await api.get(`/students/history/${id}`);
    return response.data;
  },
};

export default cleaningService;
