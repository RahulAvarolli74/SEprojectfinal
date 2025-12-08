import api from '../utils/axiosConfig';

export const workerService = {
  // Get all workers
  getWorkers: async (params = {}) => {
    const response = await api.get('/workers', { params });
    return response.data;
  },

  // Get active workers only
  getActiveWorkers: async () => {
    const response = await api.get('/workers/active');
    return response.data;
  },

  // Get single worker
  getWorkerById: async (id) => {
    const response = await api.get(`/workers/${id}`);
    return response.data;
  },

  // Create new worker
  createWorker: async (data) => {
    const response = await api.post('/workers', data);
    return response.data;
  },

  // Update worker
  updateWorker: async (id, data) => {
    const response = await api.put(`/workers/${id}`, data);
    return response.data;
  },

  // Toggle worker status
  toggleWorkerStatus: async (id) => {
    const response = await api.patch(`/workers/${id}/toggle-status`);
    return response.data;
  },

  // Delete worker
  deleteWorker: async (id) => {
    const response = await api.delete(`/workers/${id}`);
    return response.data;
  },

  // Get worker statistics
  getWorkerStats: async (id) => {
    const response = await api.get(`/workers/${id}/stats`);
    return response.data;
  },
};

export default workerService;
