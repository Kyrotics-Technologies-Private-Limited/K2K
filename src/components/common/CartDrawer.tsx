import React, { useEffect, useState } from "react";
import { X, Plus, Minus, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/store";
import {
  fetchCartItems,
  updateCartItem,
  removeCartItem,
  fetchCartById,
  createCart,
  fetchUserCart,
} from "../../store/slices/cartSlice";
import { CartItem } from "../../types/cart";
import { productApi } from "../../services/api/productApi";
import variantApi from "../../services/api/variantApi";

// Interface for product details
interface ProductDetails {
  id: string;
  name: string;
  images: {
    main: string;
    gallery: string[];
    banner: string;
  };
  description?: string;
  [key: string]: any; // Allow for any additional properties
}

// Interface for variant details
interface VariantDetails {
  id: string;
  createdAt?: Date; // Accept both Date and string types
  discount?: number;
  inStock: boolean;
  originalPrice?: number;
  price: number;
  weight: string;
  [key: string]: any; // Allow for any additional properties
}

// Combined interface for cart item with product and variant details
interface CartItemWithDetails {
  item: CartItem;
  product: ProductDetails | null;
  variant: VariantDetails | null;
  loading: boolean;
  error: string | null;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
  const {
    cart,
    cartItems,
    activeCartId,
    loading: cartLoading,
    error: cartError,
  } = useAppSelector((state) => state.cart);
  const [itemsWithDetails, setItemsWithDetails] = useState<CartItemWithDetails[]>([]);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Initial cart restoration
  useEffect(() => {
    const restoreCart = async () => {
      const savedCartId = localStorage.getItem('cartId');
      if (savedCartId && !activeCartId) {
        try {
          // Fetch the cart by saved ID
          await dispatch(fetchCartById(savedCartId)).unwrap();
          // Then fetch its items
          await dispatch(fetchCartItems(savedCartId)).unwrap();
        } catch (error) {
          console.error('Failed to restore cart:', error);
          // If restoration fails, clean up localStorage
          localStorage.removeItem('cartId');
          localStorage.removeItem('cart');
          localStorage.removeItem('cartItems');
        }
      }
    };

    restoreCart();
  }, [dispatch, activeCartId]);

  // Fetch cart data when drawer opens
  useEffect(() => {
    if (isOpen && activeCartId) {
      dispatch(fetchCartItems(activeCartId));
    }
  }, [isOpen, activeCartId, dispatch]);

  // Fetch product and variant details when cart items change
  useEffect(() => {
    const fetchItemDetails = async () => {
      if (!cartItems.length) return;

      setIsLoadingDetails(true);

      // Initialize array with loading states
      const initialItemsWithDetails = cartItems.map((item) => ({
        item,
        product: null,
        variant: null,
        loading: true,
        error: null,
      }));

      setItemsWithDetails(initialItemsWithDetails);
      console.log("itemsWithDetails", cartItems);

      // Fetch details for each item
      const detailPromises = cartItems.map(async (item) => {
        try {
          // Fetch product details
          const productDetails = await productApi.getProductById(
            item.productId
          );

          // Fetch variant details
          const variantDetails = await variantApi.getVariant(
            item.productId,
            item.variantId
          );

          // Define the result with type assertion
          const result: CartItemWithDetails = {
            item,
            product: productDetails,
            variant: variantDetails,
            loading: false,
            error: null,
          };

          return result;
        } catch (error) {
          console.error(`Error fetching details for item ${item.id}:`, error);

          // Define the error result with type assertion
          const errorResult: CartItemWithDetails = {
            item,
            product: null,
            variant: null,
            loading: false,
            error: "Failed to load item details",
          };

          return errorResult;
        }
      });

      // Wait for all details to be fetched
      const results = await Promise.all(detailPromises);
      setItemsWithDetails(results);
      setIsLoadingDetails(false);
    };

    fetchItemDetails();
  }, [cartItems]);

  const handleUpdateQuantity = async (itemId: string, newQuantity: number) => {
    if (!activeCartId || newQuantity < 1) return;

    try {
      await dispatch(
        updateCartItem({
          cartId: activeCartId,
          itemId,
          itemData: { quantity: newQuantity },
        })
      ).unwrap();
    } catch (err) {
      console.error("Failed to update item:", err);
    }
  };

  const handleRemoveItem = async (itemId: string) => {
    if (!activeCartId) return;

    try {
      await dispatch(
        removeCartItem({
          cartId: activeCartId,
          itemId,
        })
      ).unwrap();
    } catch (err) {
      console.error("Failed to remove item:", err);
    }
  };

  const handleCheckout = () => {
    onClose();
    navigate("/checkout");
  };

  // Calculate cart total
  const calculateTotal = () => {
    return itemsWithDetails.reduce((total, { item, variant }) => {
      const price = variant?.price || 0;
      return total + price * item.quantity;
    }, 0);
  };

  // Calculate total items
  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  // Show loading state if cart is loading or we're fetching details
  const isLoading = cartLoading || isLoadingDetails;

  return (
    <>
      <div
        className={`fixed inset-0 bg-gray-900/30 transition-opacity z-50 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />
      <div
        className={`fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="h-full flex flex-col">
          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-[#2C3639]">
              Shopping Cart
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {isLoading && (
            <div className="flex-1 flex items-center justify-center">
              <p>Loading your cart...</p>
            </div>
          )}

          {cartError && (
            <div className="p-4 bg-red-50 text-red-600 text-center">
              {cartError}
            </div>
          )}

          {!isLoading &&
          !cartError &&
          (!cartItems || cartItems.length === 0) ? (
            <div className="flex-1 flex flex-col items-center justify-center gap-4">
              <p className="text-gray-500">Your cart is empty</p>
              <button
                onClick={() => {
                  onClose();
                  navigate("/All-products");
                }}
                className="bg-green-800 text-white px-6 py-2 rounded-lg hover:bg-[#3A4D13] transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <>
              {/* Cart Banner */}
              <div
                className="bg-green-50 border-b border-green-100 px-6 py-3 h-32"
                style={{
                  backgroundImage: 'url("https://picsum.photos/200/300")',
                }}
              ></div>

              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto py-4">
                {itemsWithDetails.map(
                  ({ item, product, variant, loading, error }) => {
                    // Skip rendering if there was an error fetching details
                    if (error) {
                      return (
                        <div
                          key={item.id}
                          className="px-6 py-4 border-b border-gray-200 bg-red-50"
                        >
                          <p className="text-sm text-red-600">
                            Error loading item: {error}
                          </p>
                          <button
                            onClick={() => handleRemoveItem(item.id)}
                            className="mt-2 text-sm text-red-600 hover:underline"
                          >
                            Remove item
                          </button>
                        </div>
                      );
                    }

                    // Show loading state for this item
                    if (loading) {
                      return (
                        <div
                          key={item.id}
                          className="px-6 py-4 border-b border-gray-200"
                        >
                          <div className="animate-pulse flex space-x-4">
                            <div className="w-20 h-20 bg-gray-200 rounded-lg"></div>
                            <div className="flex-1 space-y-2">
                              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                              <div className="h-8 bg-gray-200 rounded w-1/3"></div>
                            </div>
                          </div>
                        </div>
                      );
                    }

                    return (
                      <div
                        key={item.id}
                        className="px-6 py-4 border-b border-gray-200 last:border-0"
                      >
                        <div className="flex gap-4">
                          <img
                            src={
                              product?.images.main ||
                              "https://picsum.photos/200/300"
                            }
                            alt={product?.name || "Product"}
                            className="w-20 h-20 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <h3 className="font-medium text-[#2C3639]">
                              {product?.name || "Product"}
                            </h3>
                            <p className="text-sm text-gray-500">
                              {variant?.weight || "Variant"}
                            </p>
                            <div className="mt-2 flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <button
                                  onClick={() =>
                                    handleUpdateQuantity(
                                      item.id,
                                      item.quantity - 1
                                    )
                                  }
                                  className="p-1 hover:bg-gray-100 rounded"
                                >
                                  <Minus className="w-4 h-4" />
                                </button>
                                <span className="w-8 text-center">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() =>
                                    handleUpdateQuantity(
                                      item.id,
                                      item.quantity + 1
                                    )
                                  }
                                  className="p-1 hover:bg-gray-100 rounded"
                                >
                                  <Plus className="w-4 h-4" />
                                </button>
                              </div>
                              <button
                                onClick={() => handleRemoveItem(item.id)}
                                className="p-1 hover:bg-gray-100 rounded text-red-500"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                          <div className="text-right">
                            {variant && (
                              <>
                                <p className="font-medium text-[#4A5D23]">
                                  ₹
                                  {(
                                    variant.price * item.quantity
                                  ).toLocaleString("en-IN")}
                                </p>
                                {variant.discount! > 0 && (
                                  <p className="text-xs text-gray-500 line-through">
                                    ₹
                                    {(
                                      variant.originalPrice! * item.quantity
                                    ).toLocaleString("en-IN")}
                                  </p>
                                )}
                                {variant.discount! > 0 && (
                                  <p className="text-xs text-green-600">
                                    {variant.discount}% off
                                  </p>
                                )}
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  }
                )}
              </div>
            </>
          )}

          {!isLoading && cartItems && cartItems.length > 0 && (
            <div className="border-t border-gray-200 px-6 py-4 space-y-4">
              <div className="flex items-center justify-between text-lg font-semibold">
                <span>Total ({getTotalItems()} items)</span>
                <span className="text-[#4A5D23]">
                  ₹{calculateTotal().toLocaleString("en-IN")}
                </span>
              </div>
              <button
                onClick={handleCheckout}
                className="w-full bg-green-800 text-white py-3 rounded-lg hover:bg-[#3A4D13] transition-colors"
              >
                Proceed to Checkout
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
