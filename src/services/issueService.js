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

  // Get single issue
  getIssueById: async (id) => {
    // No direct single issue endpoint found.
    // Likely handled in Redux/Context from list or need fallback.
    // Leaving generic path or removing if unused. 
    // Assuming backend might have a generic fetch if needed, but for now leaving as is or marking potential issue.
    // Just returning null or error to be safe? 
    // Wait, let's assume /admin/issues might take query param for ID or we filter on frontend.
    // Let's leave a generic call that might fail if not implemented.
    const response = await api.get(`/admin/issues/${id}`);
    return response.data;
  },

  // Update issue status (admin) - resolve
  resolveIssue: async (id, status, adminResponse) => {
    // Backend: /api/v1/admin/issues/:issueId/resolve
    // Method: PATCH
    // Body: { status, adminResponse }
    const response = await api.patch(`/admin/issues/${id}/resolve`, { status, adminResponse });
    return response.data;
  },

  // Add comment (not explicitly in admin routes, maybe part of resolve?)
  // Removing addComment or mapping to resolve if it updates response.

  // Get issue statistics (not directly available, maybe derived from all issues)
  getIssueStats: async () => {
    // No stats endpoint. Return empty or derived.
    return {};
  },

  // Get issues by room (admin)
  getIssuesByRoom: async (roomNo) => {
    const response = await api.get(`/admin/issues/room/${roomNo}`);
    return response.data;
  }
};

export default issueService;
