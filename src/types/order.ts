// src/types/order.ts
export interface OrderItem {
    id: string;
    product_id: string;
    name: string;
    price: number;
    quantity: number;
    image?: string;
    sku?: string;
    created_at?: string | Date;
  }
  
  export interface Order {
    id: string;
    user_id: string;
    address_id: string;
    total_amount: number;
    status: 'processing' | 'shipped' | 'delivered' | 'cancelled';
    payment_id: string;
    created_at: string | Date;
    updated_at: string | Date;
    items: OrderItem[];
  }
  
  export interface TrackingInfo {
    orderId: string;
    status: string;
    estimatedDelivery: string;
  }
  
  export interface CreateOrderData {
    user_id: string;
    address_id: string;
    total_amount: number;
    status: string;
    payment_id: string;
  }
  
  export interface OrderFilters {
    status?: string;
  }