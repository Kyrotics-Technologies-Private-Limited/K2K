// src/services/orderApi.ts
import axios, { AxiosResponse } from 'axios';
import { Order, OrderItem, TrackingInfo, CreateOrderData, OrderFilters } from '../types/order';
import { auth } from '../firebase'; // Correct import

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const orderApi = axios.create({
  baseURL: API_BASE_URL,
});

// Add a request interceptor to include the auth token
orderApi.interceptors.request.use(async (config) => {
  const user = auth.currentUser;
  if (user) {
    const token = await user.getIdToken();
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor for error handling
orderApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// User endpoints
export const getOrders = async (): Promise<AxiosResponse<Order[]>> => {
  return orderApi.get('/api/orders');
};

export const getOrder = async (id: string): Promise<AxiosResponse<Order>> => {
  return orderApi.get(`/api/orders/${id}`);
};

export const createOrder = async (
  orderData: Omit<CreateOrderData, 'user_id'>,
  items: Omit<OrderItem, 'id' | 'created_at' | 'order_id'>[]
): Promise<AxiosResponse<{ id: string }>> => {
  return orderApi.post('/api/orders', { ...orderData, items });
};

export const cancelOrder = async (id: string): Promise<AxiosResponse<{ message: string }>> => {
  return orderApi.put(`/api/orders/${id}/cancel`);
};

export const getTracking = async (id: string): Promise<AxiosResponse<TrackingInfo>> => {
  return orderApi.get(`/api/orders/${id}/tracking`);
};

// Admin endpoints
export const getAllOrdersAdmin = async (
  filters: OrderFilters = {}
): Promise<AxiosResponse<Order[]>> => {
  return orderApi.get('/api/admin/orders', { params: filters });
};

export const updateOrderStatus = async (
  id: string,
  status: string
): Promise<AxiosResponse<{ message: string }>> => {
  return orderApi.put(`/api/admin/orders/${id}/status`, { status });
};

export default orderApi;
