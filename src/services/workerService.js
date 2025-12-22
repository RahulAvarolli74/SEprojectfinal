import api from '../utils/axiosConfig';

export const workerService = {
  // Get all workers (Generic fetch, used by WorkerManagement)
  getWorkers: async (params = {}) => {
    const response = await api.get('/admin/workers-stats', { params });
    return response.data;
  },

  // FIX: Added this function because CleaningLogs.jsx and CleaningHistory.jsx call it
  getWorkersWithStats: async (params = {}) => {
    const response = await api.get('/admin/workers-stats', { params });
    return response.data;
  },

  // Get active workers only 
  getActiveWorkers: async () => {
    // This endpoint should return the simple list for dropdowns
    const response = await api.get('/students/workers');
    return response.data;
  },

  // Get single worker
  getWorkerById: async (id) => {
    const response = await api.get(`/admin/workers/${id}`);
    return response.data;
  },

  // Create new worker
  createWorker: async (data) => {
    const response = await api.post('/admin/workers', data);
    return response.data;
  },

  // Update worker
  updateWorker: async (id, data) => {
    const response = await api.put(`/admin/workers/${id}`, data);
    return response.data;
  },

  // Toggle worker status
  toggleWorkerStatus: async (id) => {
    const response = await api.patch(`/admin/workers/${id}/toggle`);
    return response.data;
  },

  // Delete worker
  deleteWorker: async (id) => {
    const response = await api.delete(`/admin/workers/${id}`);
    return response.data;
  },

  // Get worker statistics
  getWorkerStats: async (id) => {
    const response = await api.get(`/admin/workers/${id}/stats`);
    return response.data;
  }
};

export default workerService;