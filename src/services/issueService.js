import api from '../utils/axiosConfig';

export const issueService = {
  // Create new issue
  createIssue: async (data) => {
    const formData = new FormData();
    formData.append('issueType', data.issueType);
    formData.append('description', data.description);
    if (data.image) formData.append('image', data.image);

    const response = await api.post('/students/raise-issue', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  // Get student's issues
  getMyIssues: async (params = {}) => {
    const response = await api.get('/students/my-issues', { params });
    return response.data;
  },

  // Get all issues (admin)
  getAllIssues: async (params = {}) => {
    const response = await api.get('/admin/issues', { params });
    return response.data;
  },

  getIssueById: async (id) => {
  
    const response = await api.get(`/admin/issues/${id}`);
    return response.data;
  },

  resolveIssue: async (id, status, adminResponse) => {
    const response = await api.patch(`/admin/issues/${id}/resolve`, { status, adminResponse });
    return response.data;
  },

  resolveIssue: async (id, status, adminResponse) => {
    const response = await api.patch(`/admin/issues/${id}/resolve`, { status, adminResponse });
    return response.data;
  },

  getIssueStats: async () => {
    return {};
  },

  getIssuesByRoom: async (roomNo) => {
    const response = await api.get(`/admin/issues/room/${roomNo}`);
    return response.data;
  }
};

export default issueService;
