// Add to your types or cartApi.ts

import { Variant } from "../types/variant";
import { Product } from "../types/index";

export interface CartItem {
  id: string;
  productId: string;
  variantId: string;
  quantity: number;
  createdAt: string;
  updatedAt: string;
}

export interface CartItemWithDetails extends CartItem {
  product?: Product;
  variant?: Variant;
  name?: string; // Optional, can be used for display purposes
  image?: string; // Optional, can be used for display purposes
  variant_name?: string; // Optional, can be used for display purposes
  unit_price?: number; // Optional, can be used for display purposes
}

export interface Cart {
  id: string;
  userId: string;
  created_at: string;
  updated_at: string;
  items: CartItem[];
}

export interface CartSummary {
  cartId: string;
  total_items: number;
  total: number;
  updated_at: string;
}
