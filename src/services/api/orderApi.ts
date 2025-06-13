// src/api/orderapi.ts

import api from './api';
import {
  Order,
  CreateOrderPayload,
  CreateOrderResponse,
  CancelOrderPayload,
  UpdateOrderStatusPayload,
  TrackingInfo,
} from '../../types/order';
import { getAuth } from "firebase/auth";

const getAuthToken = async () => {
  const auth = getAuth();
  const user = auth.currentUser;
  if (!user) {
    throw new Error("User not authenticated. Please sign in to continue.");
  }
  return await user.getIdToken(true); // Force refresh to ensure token is valid
};

// Helper to create authenticated request config
const createAuthConfig = async () => {
  const token = await getAuthToken();
  return {
    headers: { Authorization: `Bearer ${token}` }
  };
};
export const orderApi = {
// ✅ Create an order
createOrder: async (
  payload: CreateOrderPayload
): Promise<CreateOrderResponse> => {
  const config = await createAuthConfig();
  const response = await api.post<CreateOrderResponse>('/orders', payload, config);
  return response.data;
},

// ✅ Get all orders of the current user
getUserOrders : async (): Promise<Order[]> => {
  const config = await createAuthConfig();
  const response = await api.get<Order[]>('/orders', config);
  return response.data;
},

// ✅ Get a single order by ID
getOrderById : async (orderId: string): Promise<Order> => {
  const config = await createAuthConfig();
  const response = await api.get<Order>(`/orders/${orderId}`, config);
  return response.data;
},

// ✅ Cancel an order
cancelOrder : async (
  orderId: string,
  payload?: CancelOrderPayload
): Promise<{ message: string }> => {
  const config = await createAuthConfig();
  const response = await api.put<{ message: string }>(
    `/orders/${orderId}/cancel`,
    payload || {},
    config
  );
  return response.data;
},

// ✅ Update order status (for user if allowed)
updateOrderStatus : async (
  orderId: string,
  payload: UpdateOrderStatusPayload
): Promise<{ message: string }> => {
  const config = await createAuthConfig();
  const response = await api.put<{ message: string }>(
    `/orders/${orderId}/status`,
    payload,
    config
  );
  return response.data;
},

// ✅ Track order
trackOrder : async (orderId: string): Promise<TrackingInfo> => {
  const config = await createAuthConfig();
  const response = await api.get<TrackingInfo>(`/orders/${orderId}/track`, config);
  return response.data;
}
};
