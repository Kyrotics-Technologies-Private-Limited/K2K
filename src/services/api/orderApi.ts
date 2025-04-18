// src/services/api/orderApi.ts
import axios from 'axios';
import { getAuth } from 'firebase/auth';
import {
  Order,
  OrderItem,
  TrackingInfo,
  CreateOrderPayload,
  CreateOrderResponse,
  OrderListResponse,
  UpdateOrderStatusPayload
} from '../../types/order';

const API_BASE = import.meta.env.VITE_API_BASE_URL;

const getAuthToken = async () => {
  const auth = getAuth();
  const user = auth.currentUser;
  if (!user) throw new Error('User not authenticated');
  return await user.getIdToken();
};

export const orderApi = {
  createOrder: async (payload: CreateOrderPayload): Promise<CreateOrderResponse> => {
    const token = await getAuthToken();
    const response = await axios.post(`${API_BASE}/orders`, payload, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  getOrders: async (page = 1, limit = 10): Promise<OrderListResponse> => {
    const token = await getAuthToken();
    const response = await axios.get(`${API_BASE}/orders`, {
      params: { page, limit },
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  getOrder: async (orderId: string): Promise<Order> => {
    const token = await getAuthToken();
    const response = await axios.get(`${API_BASE}/orders/${orderId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  cancelOrder: async (orderId: string, reason?: string): Promise<void> => {
    const token = await getAuthToken();
    await axios.put(`${API_BASE}/orders/${orderId}/cancel`, { reason }, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  getTracking: async (orderId: string): Promise<TrackingInfo> => {
    const token = await getAuthToken();
    const response = await axios.get(`${API_BASE}/orders/${orderId}/tracking`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  updateOrderStatus: async (orderId: string, payload: UpdateOrderStatusPayload): Promise<Order> => {
    const token = await getAuthToken();
    const response = await axios.put(`${API_BASE}/orders/${orderId}/status`, payload, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  }
};