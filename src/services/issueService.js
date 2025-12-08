import api from '../utils/axiosConfig';

export const issueService = {
  // Create new issue
  createIssue: async (data) => {
    const formData = new FormData();
    formData.append('issueType', data.issueType);
    formData.append('description', data.description);
    if (data.image) formData.append('image', data.image);

    const response = await api.post('/issues', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  // Get student's issues
  getMyIssues: async (params = {}) => {
    const response = await api.get('/issues/my-issues', { params });
    return response.data;
  },

  // Get all issues (admin)
  getAllIssues: async (params = {}) => {
    const response = await api.get('/issues', { params });
    return response.data;
  },

  // Get single issue
  getIssueById: async (id) => {
    const response = await api.get(`/issues/${id}`);
    return response.data;
  },

  // Update issue status (admin)
  updateIssueStatus: async (id, status) => {
    const response = await api.patch(`/issues/${id}/status`, { status });
    return response.data;
  },

  // Add comment to issue (admin)
  addComment: async (id, comment) => {
    const response = await api.post(`/issues/${id}/comment`, { comment });
    return response.data;
  },

  // Get issue statistics
  getIssueStats: async () => {
    const response = await api.get('/issues/stats');
    return response.data;
  },
};

export default issueService;
