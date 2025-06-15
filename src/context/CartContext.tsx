import React, { createContext, useContext, useReducer } from 'react';
import { CartItem } from '../types';

interface CartState {
  items: CartItem[];
  total: number;
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' };

const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
} | null>(null);

// Helper function to calculate total price
const calculateTotal = (items: CartItem[]): number => {
  return items.reduce((sum, item) => {
    const itemPrice = item.price.amount;
    return sum + itemPrice * item.quantity;
  }, 0);
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find(
        item => item.id === action.payload.id && 
        item.selectedVariant === action.payload.selectedVariant
      );

      let updatedItems;
      if (existingItem) {
        updatedItems = state.items.map(item =>
          item.id === action.payload.id && 
          item.selectedVariant === action.payload.selectedVariant
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        );
      } else {
        updatedItems = [...state.items, action.payload];
      }

      return {
        items: updatedItems,
        total: calculateTotal(updatedItems)
      };
    }
    
    case 'REMOVE_ITEM': {
      const updatedItems = state.items.filter(item => item.id !== action.payload);
      return {
        items: updatedItems,
        total: calculateTotal(updatedItems)
      };
    }
    
    case 'UPDATE_QUANTITY': {
      const updatedItems = state.items.map(item =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
      
      // If quantity is 0, remove the item
      const filteredItems = action.payload.quantity === 0 
        ? updatedItems.filter(item => item.id !== action.payload.id)
        : updatedItems;
        
      return {
        items: filteredItems,
        total: calculateTotal(filteredItems)
      };
    }
    
    case 'CLEAR_CART':
      return {
        items: [],
        total: 0,
      };
      
    default:
      return state;
  }
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    total: 0,
  });

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};