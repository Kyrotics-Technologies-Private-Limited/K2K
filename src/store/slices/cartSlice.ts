// src/store/slices/cartSlice.ts
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { cartApi } from '../../services/api/cartApi';
import { CartItem, Cart } from '../../types/cart';

interface CartState {
  cart: Cart | null;
  cartItems: CartItem[];
  activeCartId: string | null;
  loading: boolean;
  error: string | null;
}

// Load initial state from localStorage
const loadInitialState = (): CartState => {
  try {
    const savedCartId = localStorage.getItem('cartId');
    const savedCart = localStorage.getItem('cart');
    const savedCartItems = localStorage.getItem('cartItems');

    return {
      cart: savedCart ? JSON.parse(savedCart) : null,
      cartItems: savedCartItems ? JSON.parse(savedCartItems) : [],
      activeCartId: savedCartId || null,
      loading: false,
      error: null
    };
  } catch (error) {
    console.error('Error loading cart from localStorage:', error);
    return {
      cart: null,
      cartItems: [],
      activeCartId: null,
      loading: false,
      error: null
    };
  }
};

const initialState: CartState = loadInitialState();

// Create a new cart
export const createCart = createAsyncThunk('cart/createCart', async () => {
  const cart = await cartApi.createCart();
  // Save to localStorage
  localStorage.setItem('cartId', cart.id);
  localStorage.setItem('cart', JSON.stringify(cart));
  return cart;
});

// Get user's cart
export const fetchUserCart = createAsyncThunk('cart/fetchUserCart', async () => {
  const cart = await cartApi.getUserCart();
  // Save to localStorage
  localStorage.setItem('cartId', cart.id);
  localStorage.setItem('cart', JSON.stringify(cart));
  return cart;
});

// Get cart by ID
export const fetchCartById = createAsyncThunk(
  'cart/fetchCartById', 
  async (cartId: string) => {
    console.log('Fetching cart by ID:', cartId);
    const cart = await cartApi.getCartById(cartId);
    // Save to localStorage
    localStorage.setItem('cartId', cart.id);
    localStorage.setItem('cart', JSON.stringify(cart));
    return cart;
  }
);

// Get cart items
export const fetchCartItems = createAsyncThunk(
  'cart/fetchCartItems',
  async (cartId: string) => {
    console.log('Fetching cart items for cart ID:', cartId);
    return await cartApi.getCartItems(cartId);
  }
);

// Add item to cart
export const addToCart = createAsyncThunk(
  'cart/addItem',
  async ({cartId, itemData }: { cartId: string; itemData: Partial<CartItem> }) => {
    return await cartApi.addCartItem(cartId, itemData);
  }
);

// Update cart item
export const updateCartItem = createAsyncThunk(
  'cart/updateItem',
  async ({ cartId, itemId, itemData }: { cartId: string; itemId: string; itemData: Partial<CartItem> }) => {
    return await cartApi.updateCartItem(cartId, itemId, itemData);
  }
);

// Remove cart item
export const removeCartItem = createAsyncThunk(
  'cart/removeItem',
  async ({ cartId, itemId }: { cartId: string; itemId: string }) => {
    await cartApi.removeCartItem(cartId, itemId);
    return { cartId, itemId };
  }
);

// Delete cart
export const deleteCart = createAsyncThunk(
  'cart/deleteCart',
  async (cartId: string) => {
    await cartApi.deleteCart(cartId);
    return cartId;
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setActiveCart: (state, action) => {
      state.activeCartId = action.payload;
      localStorage.setItem('cartId', action.payload);
    }
  },
  extraReducers: (builder) => {
    builder
      // Create Cart
      .addCase(createCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
        state.activeCartId = action.payload.id;
        localStorage.setItem('cart', JSON.stringify(action.payload));
      })
      .addCase(createCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to create cart';
      })
      
      // Fetch User Cart
      .addCase(fetchUserCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
        state.activeCartId = action.payload.id;
      })
      .addCase(fetchUserCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch user cart';
      })
      
      // Fetch Cart by ID
      .addCase(fetchCartById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCartById.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
        state.activeCartId = action.payload.id;
      })
      .addCase(fetchCartById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch cart';
      })
      
      // Fetch Cart Items
      .addCase(fetchCartItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = action.payload;
      })
      .addCase(fetchCartItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch cart items';
      })
      
      // Add Item
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        
        const existingItemIndex = state.cartItems.findIndex(item => item.id === action.payload.id);
        if (existingItemIndex !== -1) {
          state.cartItems[existingItemIndex] = action.payload;
        } else {
          state.cartItems.push(action.payload);
        }
        localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to add item to cart';
      })
      
      // Update Item
      .addCase(updateCartItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        state.loading = false;
        
        const itemIndex = state.cartItems.findIndex(item => item.id === action.payload.id);
        if (itemIndex !== -1) {
          state.cartItems[itemIndex] = action.payload;
        }
        localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
      })
      .addCase(updateCartItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to update cart item';
      })
      
      // Remove Item
      .addCase(removeCartItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeCartItem.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = state.cartItems.filter(item => item.id !== action.payload.itemId);
        localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
      })
      .addCase(removeCartItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to remove cart item';
      })
      
      // Delete Cart
      .addCase(deleteCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCart.fulfilled, (state, action) => {
        state.loading = false;
        if (state.activeCartId === action.payload) {
          state.cart = null;
          state.cartItems = [];
          state.activeCartId = null;
          localStorage.removeItem('cartId');
          localStorage.removeItem('cart');
          localStorage.removeItem('cartItems');
        }
      })
      .addCase(deleteCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to delete cart';
      });
  }
});

export const { setActiveCart } = cartSlice.actions;
export default cartSlice.reducer;