// src/store/slices/cartSlice.ts
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { cartApi } from "../../services/api/cartApi";
import { CartItem, Cart } from "../../types/cart";
import { productApi } from "../../services/api/productApi";
import variantApi from "../../services/api/variantApi";
import { Product } from "@/types/index";
import { Variant } from "@/types/variant";
import { RootState } from "../store";

interface CartItemWithDetails extends CartItem {
  product?: Product;
  variant?: Variant;
}

interface CartState {
  cart: Cart | null;
  cartItems: CartItemWithDetails[];
  activeCartId: string | null;
  loading: boolean;
  error: string | null;
  buyNowItem?: CartItemWithDetails | null; // <-- add this
}

// //Load initial state from localStorage
// const loadInitialState = (): CartState => {
//   try {
//     const savedCartId = localStorage.getItem("cartId");
//     const savedCart = localStorage.getItem("cart");
//     const savedCartItems = localStorage.getItem("cartItems");

//     return {
//       cart: savedCart ? JSON.parse(savedCart) : null,
//       cartItems: savedCartItems ? JSON.parse(savedCartItems) : [],
//       activeCartId: savedCartId || null,
//       loading: false,
//       error: null,
//     };
//   } catch (error) {
//     console.error("Error loading cart from localStorage:", error);
//     return {
//       cart: null,
//       cartItems: [],
//       activeCartId: null,
//       loading: false,
//       error: null,
//     };
//   }
// };
// Helper function to fetch product and variant details
async function fetchItemDetails(item: CartItem): Promise<CartItemWithDetails> {
  try {
    const [product, variant] = await Promise.all([
      productApi.getProductById(item.productId),
      variantApi.getVariantById(item.productId, item.variantId),
    ]);

    return {
      ...item,
      product,
      variant,
    };
  } catch (error) {
    console.error(`Error fetching details for item ${item.id}:`, error);
    return item;
  }
}

// Initialize cart
export const initializeCart = createAsyncThunk(
  "cart/initializeCart",
  async () => {
    try {
      // First try to load from localStorage
      const savedCartId = localStorage.getItem("cartId");
      if (savedCartId) {
        // If we have a cartId, fetch that cart and its items
        const cart = await cartApi.getCartById(savedCartId);
        const items = await cartApi.getCartItems(savedCartId);
        return { cart, items };
      }

      // If no saved cart, try to get user's cart from backend
      const cart = await cartApi.getUserCart();
      const items = await cartApi.getCartItems(cart.id);

      // Save to localStorage
      localStorage.setItem("cartId", cart.id);
      localStorage.setItem("cart", JSON.stringify(cart));
      localStorage.setItem("cartItems", JSON.stringify(items));

      return { cart, items };
    } catch (error) {
      console.error("Error initializing cart:", error);
      // Clear localStorage if there was an error
      localStorage.removeItem("cartId");
      localStorage.removeItem("cart");
      localStorage.removeItem("cartItems");
      return { cart: null, items: [] };
    }
  }
);

const initialState: CartState = {
  cart: null,
  cartItems: [],
  activeCartId: null,
  loading: false,
  error: null,
  buyNowItem: null, // <-- add this
};

// Create a new cart
export const createCart = createAsyncThunk("cart/createCart", async () => {
  const cart = await cartApi.createCart();
  // activeCartId = cart.id;
  console.log("cartId", cart.id)
  // Save to localStorage
  localStorage.setItem("cartId", cart.id);
  localStorage.setItem("cart", JSON.stringify(cart));
  return cart;
});

// Get user's cart
export const fetchUserCart = createAsyncThunk(
  "cart/fetchUserCart",
  async () => {
    const cart = await cartApi.getUserCart();
    // Save to localStorage
    localStorage.setItem("cartId", cart.id);
    localStorage.setItem("cart", JSON.stringify(cart));
    return cart;
  }
);

// Get cart by ID
export const fetchCartById = createAsyncThunk(
  "cart/fetchCartById",
  async (cartId: string) => {
    console.log("Fetching cart by ID:", cartId);
    const cart = await cartApi.getCartById(cartId);
    // Save to localStorage
    localStorage.setItem("cartId", cart.id);
    localStorage.setItem("cart", JSON.stringify(cart));
    return cart;
  }
);

// Modify fetchCartItems to include product and variant details
export const fetchCartItems = createAsyncThunk(
  "cart/fetchCartItems",
  async (cartId: string) => {
    console.log("Fetching cart items for cart ID:", cartId);
    const items = await cartApi.getCartItems(cartId);
    const itemsWithDetails = await Promise.all(
      items.map((item) => fetchItemDetails(item))
    );
    return itemsWithDetails;
  }
);

// Modify addToCart to include product and variant details
// export const addToCart = createAsyncThunk(
//   "cart/addItem",
//   async ({
//     cartId,
//     itemData,
//   }: {
//     cartId: string;
//     itemData: Partial<CartItem>;
//   }) => {
//     const newItem = await cartApi.addCartItem(cartId, itemData);
//     return await fetchItemDetails(newItem);
//   }
// );

export const addToCart = createAsyncThunk<
  CartItemWithDetails,
  Partial<CartItem>,
  { state: RootState }
>(
  'cart/addItem',
  async (itemData, { getState, dispatch }) => {
    let cartId = getState().cart.activeCartId;
    if (!cartId) {
      try {
        // Try to get user cart first
        const cart = await dispatch(fetchUserCart()).unwrap();
        cartId = cart.id;
      } catch (error) {
        // If user cart fails, create a new cart
        console.log("Creating new cart for user");
        const cart = await dispatch(createCart()).unwrap();
        cartId = cart.id;
      }
    }
    const newItem = await cartApi.addCartItem(cartId, itemData);
    return fetchItemDetails(newItem);
  }
);




// Update cart item
export const updateCartItem = createAsyncThunk(
  "cart/updateItem",
  async ({
    cartId,
    itemId,
    itemData,
  }: {
    cartId: string;
    itemId: string;
    itemData: Partial<CartItem>;
  }) => {
    const updatedItem = await cartApi.updateCartItem(cartId, itemId, itemData);
    // Fetch and return the item with product and variant details
    return updatedItem;
  }
);

// Remove cart item
export const removeCartItem = createAsyncThunk(
  "cart/removeItem",
  async ({ cartId, itemId }: { cartId: string; itemId: string }) => {
    await cartApi.removeCartItem(cartId, itemId);
    return { cartId, itemId };
  }
);

// Delete cart
export const deleteCart = createAsyncThunk(
  "cart/deleteCart",
  async (cartId: string) => {
    await cartApi.deleteCart(cartId);
    return cartId;
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setActiveCart: (state, action) => {
      state.activeCartId = action.payload;
      localStorage.setItem("cartId", action.payload);
    },
    setBuyNowItem: (state, action) => {
      state.buyNowItem = action.payload;
    },
    clearBuyNowItem: (state) => {
      state.buyNowItem = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Initialize Cart
      .addCase(initializeCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(initializeCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload.cart;
        state.cartItems = action.payload.items;
        state.activeCartId = action.payload.cart?.id || null;
      })
      .addCase(initializeCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to initialize cart";
      })
      // Create Cart
      .addCase(createCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
        state.activeCartId = action.payload.id;
        localStorage.setItem("cart", JSON.stringify(action.payload));
      })
      .addCase(createCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to create cart";
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
        state.error = action.error.message || "Failed to fetch user cart";
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
        state.error = action.error.message || "Failed to fetch cart";
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
        state.error = action.error.message || "Failed to fetch cart items";
      })

      // Add Item
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;

        const existingItemIndex = state.cartItems.findIndex(
          (item) => item.id === action.payload.id
        );
        if (existingItemIndex !== -1) {
          state.cartItems[existingItemIndex] = action.payload;
        } else {
          state.cartItems.push(action.payload);
        }
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        // Handle stock validation errors specifically
        if (action.error.message && action.error.message.includes("stock")) {
          state.error = action.error.message;
        } else {
          state.error = action.error.message || "Failed to add item to cart";
        }
      })

      // Update Item
      .addCase(updateCartItem.pending, (state) => {
        state.loading = false; // Keep false to avoid full cart loading state
        state.error = null;
      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        state.loading = false;
        const itemIndex = state.cartItems.findIndex(
          (item) => item.id === action.payload.id
        );
        if (itemIndex !== -1) {
          // Preserve existing product and variant details while updating the item
          state.cartItems[itemIndex] = {
            ...action.payload,
            product:
              state.cartItems[itemIndex].product,
            variant:
              state.cartItems[itemIndex].variant,
          };
        }
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      })
      .addCase(updateCartItem.rejected, (state, action) => {
        state.loading = false;
        // Handle stock validation errors specifically
        if (action.error.message && action.error.message.includes("stock")) {
          state.error = action.error.message;
        } else {
          state.error = action.error.message || "Failed to update cart item";
        }
      })

      // Remove Item
      .addCase(removeCartItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeCartItem.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = state.cartItems.filter(
          (item) => item.id !== action.payload.itemId
        );
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      })
      .addCase(removeCartItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to remove cart item";
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
          localStorage.removeItem("cartId");
          localStorage.removeItem("cart");
          localStorage.removeItem("cartItems");
        }
      })
      .addCase(deleteCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to delete cart";
      });
  },
});

export const { setActiveCart, setBuyNowItem, clearBuyNowItem } = cartSlice.actions;
export default cartSlice.reducer;
