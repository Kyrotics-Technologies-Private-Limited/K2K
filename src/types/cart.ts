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


// import { Variant } from "../types/variant";
// import { Product } from "../types/index";

// /**
//  * Basic item reference in cart (as persisted in backend)
//  */
// export interface CartItem {
//   id: string;
//   productId: string;
//   variantId: string;
//   quantity: number;
//   createdAt: string;
//   updatedAt: string;
// }

// /**
//  * Cart item object, enriched with all business logic for display,
//  * including membership pricing info
//  */
// export interface CartItemWithDetails extends CartItem {
//   product?: Product;
//   variant?: Variant;
//   // --- Optional UI/display fields ---
//   name?: string;
//   image?: string;
//   variant_name?: string;
//   unit_price?: number;

//   // --- Membership Price Fields (these are core for KP logic) ---
//   /** The variant price at the time of add/update */
//   basePrice: number;
//   /** The membership discounted price (if applied), else same as basePrice */
//   discountedPrice: number;
//   /** The discount rate (%) applied at the time for this item (optional for audit) */
//   discountPercent?: number;
//   /** Was a membership discount applied at all? */
//   isMembershipApplied?: boolean;
// }

// /**
//  * Cart. Note: items may be held separately in your Redux slice.
//  */
// export interface Cart {
//   id: string;
//   userId: string;
//   created_at: string;
//   updated_at: string;
//   items: CartItem[];
// }

// /**
//  * For cart summary panels/mini-carts
//  */
// export interface CartSummary {
//   cartId: string;
//   total_items: number;
//   total: number;
//   updated_at: string;
// }
