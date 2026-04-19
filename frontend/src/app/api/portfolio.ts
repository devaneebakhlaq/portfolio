import axios from 'axios';

const BASE_URL = (typeof import.meta !== 'undefined' && (import.meta as any).env?.VITE_API_URL) || 'http://localhost:5000/api';

const api = axios.create({ baseURL: BASE_URL, timeout: 10000 });

export const getProfile  = ()    => api.get('/profile');
export const getProjects = ()    => api.get('/projects');
export const getSkills   = ()    => api.get('/skills');
export const sendMessage = (data: { name: string; email: string; message: string }) =>
  api.post('/contact', data);
export const adminLogin  = (data: { email: string; password: string }) =>
  api.post('/admin/login', data);

export const setAuthToken = (token: string) => {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};
export const removeAuthToken = () => {
  delete api.defaults.headers.common['Authorization'];
};

export default api;
