import React, { useEffect, useState } from "react";
import { X, Plus, Minus, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/store";
import {
  fetchCartItems,
  updateCartItem,
  removeCartItem,
  fetchCartById,
  clearBuyNowItem,
} from "../../store/slices/cartSlice";
import { CartItemSkeleton } from "./CartItemSkeleton";

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

  // Local loading states for individual items
  const [updatingItems, setUpdatingItems] = useState<{
    [key: string]: boolean;
  }>({});

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Initial cart restoration
  useEffect(() => {
    const restoreCart = async () => {
      const savedCartId = localStorage.getItem("cartId");
      if (savedCartId && !activeCartId) {
        try {
          await dispatch(fetchCartById(savedCartId)).unwrap();
          await dispatch(fetchCartItems(savedCartId)).unwrap();
        } catch (error) {
          console.error("Failed to restore cart:", error);
          localStorage.removeItem("cartId");
          localStorage.removeItem("cart");
          localStorage.removeItem("cartItems");
        }
      }
    };

    restoreCart();
  }, [dispatch, activeCartId]);

  const handleUpdateQuantity = async (itemId: string, newQuantity: number) => {
    if (!activeCartId || newQuantity < 1) return;

    try {
      setUpdatingItems((prev) => ({ ...prev, [itemId]: true }));
      await dispatch(
        updateCartItem({
          cartId: activeCartId,
          itemId,
          itemData: { quantity: newQuantity },
        })
      ).unwrap();
    } catch (err) {
      console.error("Failed to update item:", err);
    } finally {
      setUpdatingItems((prev) => ({ ...prev, [itemId]: false }));
    }
  };

  const handleRemoveItem = async (itemId: string) => {
    if (!activeCartId) return;

    try {
      setUpdatingItems((prev) => ({ ...prev, [itemId]: true }));
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
    // Clear any previous buy now session before cart checkout
    dispatch(clearBuyNowItem());
    // Also reset checkout state to ensure step is 1 and no previous session remains
    dispatch({ type: 'checkout/resetCheckout' });
    onClose();
    navigate("/checkout");
  };

  // Calculate cart total
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const price = item.variant?.price || 0;
      return total + price * item.quantity;
    }, 0);
  };

  // Calculate total items
  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const renderSkeletons = () => {
    return Array(3)
      .fill(null)
      .map((_, index) => <CartItemSkeleton key={index} />);
  };

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
              <X className="button w-5 h-5" />
            </button>
          </div>

          {cartLoading && (
            <div className="flex-1 overflow-y-auto py-4">
              {renderSkeletons()}
            </div>
          )}

          {cartError && (
            <div className="p-4 bg-red-50 text-red-600 text-center">
              {cartError}
            </div>
          )}

          {!cartLoading &&
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
              <div className="flex-1 overflow-y-auto py-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="px-6 py-4 border-b border-gray-200 last:border-0"
                  >
                    {updatingItems[item.id] ? (
                      <CartItemSkeleton />
                    ) : (
                      <div className="flex gap-4">
                        <img
                          src={
                            item.product?.images.main ||
                            "https://picsum.photos/200/300"
                          }
                          alt={item.product?.name || "Product"}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h3 className="font-medium text-[#2C3639]">
                            {item.product?.name || "Product"}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {item.variant?.weight || "Variant"}
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
                                disabled={updatingItems[item.id]}
                              >
                                <Minus className="button w-4 h-4" />
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
                                disabled={updatingItems[item.id]}
                              >
                                <Plus className="button w-4 h-4" />
                              </button>
                            </div>
                            <button
                              onClick={() => handleRemoveItem(item.id)}
                              className="p-1 hover:bg-gray-100 rounded text-red-500"
                              disabled={updatingItems[item.id]}
                            >
                              <Trash2 className="button w-4 h-4" />
                            </button>
                          </div>
                        </div>
                        <div className="text-right">
                          {item.variant && (
                            <>
                              <p className="font-medium text-[#4A5D23]">
                                ₹
                                {(
                                  item.variant.price * item.quantity
                                ).toLocaleString("en-IN")}
                              </p>
                              {item.variant.discount! > 0 && (
                                <p className="text-xs text-gray-500 line-through">
                                  ₹
                                  {(
                                    item.variant.originalPrice! * item.quantity
                                  ).toLocaleString("en-IN")}
                                </p>
                              )}
                              {item.variant.discount! > 0 && (
                                <p className="text-xs text-green-600">
                                  {item.variant.discount}% off
                                </p>
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}

          {!cartLoading && cartItems && cartItems.length > 0 && (
            <div className="border-t border-gray-200 px-6 py-4 space-y-4">
              <div className="flex items-center justify-between text-lg font-semibold">
                <span>Total ({getTotalItems()} items)</span>
                <span className="text-[#4A5D23]">
                  ₹{calculateTotal().toLocaleString("en-IN")}
                </span>
              </div>
              <button
                onClick={handleCheckout}
                className="button w-full bg-green-800 text-white py-3 rounded-lg hover:bg-[#3A4D13] transition-colors"
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
