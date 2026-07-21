import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // Hedera network calls might take slightly longer
  headers: { 'Content-Type': 'application/json' },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message = error.response?.data?.error || error.response?.data?.message || error.message || 'An error occurred';
    return Promise.reject(new Error(message));
  }
);

export const transferService = {
  createTransfer: async (transferData) => {
    return apiClient.post('/transfers', transferData);
  },
  getTransfer: async (id) => {
    return apiClient.get(`/transfers/${id}`);
  },
  getTransferStatus: async (id) => {
    return apiClient.get(`/transfers/${id}/status`);
  },
  searchTransfers: async (query) => {
    return apiClient.get(`/transfers?search=${encodeURIComponent(query)}`);
  },
  tamperTransfer: async (id, updates) => {
    return apiClient.post(`/transfers/${id}/tamper`, updates);
  }
};

export const complianceService = {
  getComplianceRecord: async (id) => {
    return apiClient.get(`/transfers/${id}/compliance`);
  },
  verifyComplianceHash: async (id, record) => {
    return apiClient.post(`/transfers/${id}/verify`, { record });
  },
};

export const paymentService = {
  processSandboxPayment: async (paymentData) => {
    return apiClient.post('/payments', paymentData);
  },
};

export const communityService = {
  generateCode: async (id) => {
    return apiClient.post(`/transfers/${id}/community-code`);
  },
  submitPost: async ({ code, displayName, country, message }) => {
    return apiClient.post('/community/posts', { code, displayName, country, message });
  },
  listPosts: async () => {
    return apiClient.get('/community/posts');
  },
};

export default apiClient;
