import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { orderApi } from '../../services/api/orderApi';
import { Order, CreateOrderPayload, UpdateOrderStatusPayload } from '../../types/order';

interface OrderState {
  orders: Order[];
  currentOrder: Order | null;
  loading: boolean;
  error: string | null;
}

const initialState: OrderState = {
  orders: [],
  currentOrder: null,
  loading: false,
  error: null,
};

// Create order
export const createOrder = createAsyncThunk(
  'order/createOrder',
  async (payload: CreateOrderPayload) => {
    type CreateOrderResponse = { order?: Order; id?: string };
    const response = await orderApi.createOrder(payload) as CreateOrderResponse;
    // Map or fetch the created order details to match the Order type
    // If response contains the order object, return it directly
    // Otherwise, fetch the order by ID or map the response accordingly
    if ('order' in response && response.order) {
      return response.order as Order;
    }
    // If response contains the order ID, fetch the order details
    if ('id' in response && response.id) {
      return await orderApi.getOrderById(response.id) as Order;
    }
    throw new Error('Invalid createOrder response');
  }
);

// Get all orders for user
export const fetchOrders = createAsyncThunk(
  'order/fetchOrders',
  async () => {
    return await orderApi.getUserOrders();
  }
);

// Get order by ID
export const fetchOrderById = createAsyncThunk(
  'order/fetchOrderById',
  async (orderId: string) => {
    return await orderApi.getOrderById(orderId);
  }
);

// Update order status
export const updateOrderStatus = createAsyncThunk(
  'order/updateStatus',
  async ({ orderId, status }: { orderId: string; status: UpdateOrderStatusPayload['status'] }) => {
    const response = await orderApi.updateOrderStatus(orderId, { status });
    return { orderId, status, message: response.message };
  }
);

// Cancel order
export const cancelOrder = createAsyncThunk(
  'order/cancelOrder',
  async (orderId: string) => {
    const response = await orderApi.cancelOrder(orderId);
    return { orderId, message: response.message };
  }
);

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearCurrentOrder: (state) => {
      state.currentOrder = null;
    },
    resetOrderState: (state) => {
      state.orders = [];
      state.currentOrder = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Order
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.currentOrder = action.payload;
        state.orders.unshift(action.payload);
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to create order';
      })

      // Fetch Orders
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch orders';
      })

      // Fetch Order by ID
      .addCase(fetchOrderById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrderById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentOrder = action.payload;
      })
      .addCase(fetchOrderById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch order';
      })

      // Update Order Status
      .addCase(updateOrderStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.loading = false;
        // Update status in both current order and orders list
        if (state.currentOrder?.id === action.payload.orderId) {
          state.currentOrder.status = action.payload.status;
        }
        const orderIndex = state.orders.findIndex(order => order.id === action.payload.orderId);
        if (orderIndex !== -1) {
          state.orders[orderIndex].status = action.payload.status;
        }
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to update order status';
      })

      // Cancel Order
      .addCase(cancelOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(cancelOrder.fulfilled, (state, action) => {
        state.loading = false;
        // Update status to cancelled in both current order and orders list
        if (state.currentOrder?.id === action.payload.orderId) {
          state.currentOrder.status = 'cancelled';
        }
        const orderIndex = state.orders.findIndex(order => order.id === action.payload.orderId);
        if (orderIndex !== -1) {
          state.orders[orderIndex].status = 'cancelled';
        }
      })
      .addCase(cancelOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to cancel order';
      });
  },
});

export const { clearCurrentOrder, resetOrderState } = orderSlice.actions;
export default orderSlice.reducer;