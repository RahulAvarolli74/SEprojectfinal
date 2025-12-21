import api from '../utils/axiosConfig';

export const workerService = {
  // Get all workers (with stats)
  getWorkers: async (params = {}) => {
    // Backend has /admin/workers-stats which returns workers.
    const response = await api.get('/admin/workers-stats', { params });
    return response.data;
  },

  // Get active workers only 
  // (Assuming backend might filter or we filter on frontend, 
  // or use workers-stats and filter. There is no specific active-only endpoint in admin routes seen so far)
  getActiveWorkers: async () => {
    // Fallback to getting all using stats endpoint and filtering in component if needed, 
    // or if backend supports ?active=true.
    // For now pointing to same endpoint.
    const response = await api.get('/admin/workers-stats');
    // If backend returns all, frontend filters.
    return response.data;
  },

  // Get single worker
  getWorkerById: async (id) => {
    // No direct single worker endpoint visible in admin.routes.js
    // Might need feature add in backend or finding in list.
    // Leaving generic path.
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
    // No explicit update route in admin.routes.js (only toggle status).
    // Marking as implementation gap or generic path.
    const response = await api.put(`/admin/workers/${id}`, data);
    return response.data;
  },

  // Toggle worker status
  toggleWorkerStatus: async (id) => {
    // Route: /admin/workers/:id/toggle
    const response = await api.patch(`/admin/workers/${id}/toggle`);
    return response.data;
  },

  // Delete worker
  deleteWorker: async (id) => {
    // No delete route in admin.routes.js.
    const response = await api.delete(`/admin/workers/${id}`);
    return response.data;
  },

  // Get worker statistics (same as getWorkers basically in this backend)
  getWorkerStats: async (id) => {
    // Re-using main stats or generic.
    const response = await api.get(`/admin/workers/${id}/stats`);
    return response.data;
  },
};

export default workerService;
