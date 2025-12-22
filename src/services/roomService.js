import api from '../utils/axiosConfig';

export const roomService = {
  createRoom: async (data) => {
    // Backend expects { room_no, password }
    const response = await api.post('/admin/create-room', data);
    return response.data;
  },
};

export default roomService;