// src/services/cartApi.ts
import { getAuth, User } from 'firebase/auth';

// API base URL
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5566';

// Cart related interfaces
interface CartItem {
  id: string;
  cart_id: string;
  product_id: string;
  variant_id: string | null;
  quantity: number;
  created_at: any; // Firestore timestamp
  updated_at: any; // Firestore timestamp
}

interface Cart {
  id: string;
  user_id: string;
  created_at: any; // Firestore timestamp
  updated_at: any; // Firestore timestamp
  items: CartItem[];
}

interface CartResponse {
  cart: Cart;
}

interface CartSummary {
  item_count: number;
  subtotal: number;
  tax: number;
  total: number;
  cart_id: string;
}

interface ApiError {
  error: string;
  message?: string;
}

interface AddItemRequest {
  product_id: string;
  variant_id: string | null;
  quantity: number;
}

interface UpdateItemRequest {
  quantity: number;
}

/**
 * Get authentication token from Firebase
 * @returns Promise with the authentication token
 */
async function getAuthToken(): Promise<string> {
  const auth = getAuth();
  const user: User | null = auth.currentUser;
  
  if (!user) {
    throw new Error('User not authenticated');
  }
  
  return user.getIdToken();
}

/**
 * Make authenticated API requests
 * @param endpoint - API endpoint
 * @param options - Fetch options
 * @returns Promise with the response data
 */
async function authFetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  try {
    const token = await getAuthToken();
    
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      ...(options.headers || {})
    };
    
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers
    });
    
    if (!response.ok) {
      const errorData: ApiError = await response.json().catch(() => ({ 
        error: `API request failed with status ${response.status}` 
      }));
      throw new Error(errorData.error || `API request failed with status ${response.status}`);
    }
    
    return response.json() as Promise<T>;
  } catch (error) {
    console.error('Cart API Error:', error);
    throw error;
  }
}

/**
 * Cart API methods for interacting with the cart service
 */
const cartApi = {
  /**
   * Get the current user's cart
   * @returns Promise with cart data and items
   */
  getCart: (): Promise<CartResponse> => 
    authFetch<CartResponse>('/api/carts'),
  
  /**
   * Add an item to the cart
   * @param productId - Product ID
   * @param variantId - Variant ID (optional)
   * @param quantity - Quantity to add
   * @returns Promise with the added cart item
   */
  addItem: (productId: string, variantId: string | null = null, quantity: number = 1): Promise<CartItem> => 
    authFetch<CartItem>('/api/carts/items', {
      method: 'POST',
      body: JSON.stringify({
        product_id: productId,
        variant_id: variantId,
        quantity
      } as AddItemRequest)
    }),
  
  /**
   * Update cart item quantity
   * @param itemId - Cart item ID
   * @param quantity - New quantity (0 removes the item)
   * @returns Promise with the updated cart item or removal confirmation
   */
  updateItem: (itemId: string, quantity: number): Promise<CartItem | { message: string }> => 
    authFetch<CartItem | { message: string }>(`/api/carts/items/${itemId}`, {
      method: 'PUT',
      body: JSON.stringify({ quantity } as UpdateItemRequest)
    }),
  
  /**
   * Remove an item from the cart
   * @param itemId - Cart item ID
   * @returns Promise with removal confirmation
   */
  removeItem: (itemId: string): Promise<{ message: string }> => 
    authFetch<{ message: string }>(`/api/carts/items/${itemId}`, {
      method: 'DELETE'
    }),
  
  /**
   * Clear all items from the cart
   * @returns Promise with confirmation message
   */
  clearCart: (): Promise<{ message: string }> => 
    authFetch<{ message: string }>('/api/carts/items', {
      method: 'DELETE'
    }),
  
  /**
   * Get cart summary with totals
   * @returns Promise with cart summary including subtotal, tax, and total
   */
  getCartSummary: (): Promise<CartSummary> => 
    authFetch<CartSummary>('/api/carts/summary')
};

export default cartApi;
export type { CartItem, Cart, CartResponse, CartSummary };