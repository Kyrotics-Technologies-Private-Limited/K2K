import { useEffect, useState, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import {
  setSelectedAddress,
  setAddresses,
  setStep,
  setIsAddingNewAddress,
} from "../../store/slices/checkoutSlice";
import { updateCartItem, removeCartItem } from "../../store/slices/cartSlice";
import { Address } from "../../types/address";
import { addressApi } from "../../services/api/addressApi";
import { PlusCircle, Trash2, Plus, Minus } from "lucide-react";

export const SelectStep = () => {
  const dispatch = useAppDispatch();
  const { addresses, selectedAddress, isAddingNewAddress } = useAppSelector(
    (state) => state.checkout
  );
  const { buyNowItem, cartItems, activeCartId } = useAppSelector(
    (state) => state.cart
  );
  const { user } = useAppSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [itemLoading, setItemLoading] = useState<{ [key: string]: boolean }>(
    {}
  );

  const [formData, setFormData] = useState<
    Omit<Address, "id" | "userId" | "createdAt">
  >({
    name: "",
    phone: "",
    appartment: "",
    adress: "",
    state: "",
    country: "India",
    pincode: "",
    isDefault: false,
  });

  // Memoize itemsToCheckout to prevent infinite update loop
  const itemsToCheckout = useMemo(
    () => (buyNowItem ? [buyNowItem] : cartItems),
    [buyNowItem, cartItems]
  );

  // Local order summary calculation for itemsToCheckout
  const localOrderSummary = useMemo(() => {
    const subtotal = itemsToCheckout.reduce((total, item) => {
      return total + (item.variant?.price || 0) * item.quantity;
    }, 0);
    const tax = 0; // GST removed
    const shipping = subtotal > 500 ? 0 : 40;
    return {
      subtotal,
      tax,
      shipping,
      total: subtotal + shipping,
    };
  }, [itemsToCheckout]);

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        setLoading(true);
        const addresses = await addressApi.getAll();
        dispatch(setAddresses(addresses));
        // If there's a default address, select it
        const defaultAddress = addresses.find((addr) => addr.isDefault);
        if (defaultAddress) {
          dispatch(setSelectedAddress(defaultAddress));
        }
      } catch (err) {
        setError("Failed to load addresses");
      } finally {
        setLoading(false);
      }
    };

    fetchAddresses();
  }, [dispatch]);

  const handleSelectAddress = (address: Address) => {
    dispatch(setSelectedAddress(address));
  };

  const handleUpdateQuantity = async (itemId: string, newQuantity: number) => {
    if (!activeCartId || newQuantity < 1 || itemLoading[itemId]) return;

    try {
      setItemLoading((prev) => ({ ...prev, [itemId]: true }));
      await dispatch(
        updateCartItem({
          cartId: activeCartId,
          itemId,
          itemData: { quantity: newQuantity },
        })
      ).unwrap();
    } catch (error) {
      console.error("Failed to update quantity:", error);
    } finally {
      setItemLoading((prev) => ({ ...prev, [itemId]: false }));
    }
  };

  const handleRemoveItem = async (itemId: string) => {
    if (!activeCartId || itemLoading[itemId]) return;

    try {
      setItemLoading((prev) => ({ ...prev, [itemId]: true }));
      await dispatch(
        removeCartItem({
          cartId: activeCartId,
          itemId,
        })
      ).unwrap();
    } catch (error) {
      console.error("Failed to remove item:", error);
    }
  };

  const handleAddNewAddress = () => {
    dispatch(setIsAddingNewAddress(true));
    setFormData({
      name: user?.name || "",
      phone: user?.phone || "",
      appartment: "",
      adress: "",
      state: "",
      country: "India",
      pincode: "",
      isDefault: !addresses.length,
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const newAddress = await addressApi.create(formData);
      dispatch(setAddresses([...addresses, newAddress]));
      dispatch(setSelectedAddress(newAddress));
      dispatch(setIsAddingNewAddress(false));
    } catch (err) {
      setError("Failed to save address");
    } finally {
      setLoading(false);
    }
  };

  const handleContinue = () => {
    if (!selectedAddress) {
      setError("Please select a delivery address");
      return;
    }
    if (itemsToCheckout.length === 0) {
      setError("No items to checkout");
      return;
    }
    // Always go to the first review step (step 2)
    dispatch(setStep(2));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Address Section */}
        <div>
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            {!isAddingNewAddress ? (
              <>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">
                    Select Delivery Address
                  </h2>
                  <button
                    onClick={handleAddNewAddress}
                    className="button flex items-center text-green-600 hover:text-green-700"
                  >
                    <PlusCircle className="w-5 h-5 mr-1" />
                    Add New Address
                  </button>
                </div>

                <div className="space-y-4">
                  {addresses.map((address) => (
                    <div
                      key={address.adress}
                      className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                        selectedAddress?.adress === address.adress
                          ? "border-green-500 bg-green-50"
                          : "border-gray-200 hover:border-green-300"
                      }`}
                      onClick={() => handleSelectAddress(address)}
                    >
                      <div className="flex justify-between">
                        <div>
                          <h3 className="font-medium">{address.name}</h3>
                          <p className="text-sm text-gray-600">
                            {address.phone}
                          </p>
                        </div>
                        {address.isDefault && (
                          <span className="text-sm text-green-600 font-medium">
                            Default
                          </span>
                        )}
                      </div>
                      <div className="mt-2 text-sm text-gray-600">
                        <p>{address.appartment}</p>
                        <p>{address.adress}</p>
                        <p>
                          {address.state}, {address.pincode}
                        </p>
                        <p>{address.country}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h2 className="text-xl font-semibold mb-4">Add New Address</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Apartment/Suite
                  </label>
                  <input
                    type="text"
                    name="appartment"
                    value={formData.appartment}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Street Address
                  </label>
                  <input
                    type="text"
                    name="adress"
                    required
                    value={formData.adress}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      State
                    </label>
                    <input
                      type="text"
                      name="state"
                      required
                      value={formData.state}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Pincode
                    </label>
                    <input
                      type="text"
                      name="pincode"
                      required
                      value={formData.pincode}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Country
                    </label>
                    <input
                      type="text"
                      name="country"
                      required
                      value={formData.country}
                      disabled
                      className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50"
                    />
                  </div>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="isDefault"
                    name="isDefault"
                    checked={formData.isDefault}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        isDefault: e.target.checked,
                      }))
                    }
                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="isDefault"
                    className="ml-2 block text-sm text-gray-700"
                  >
                    Set as default address
                  </label>
                </div>

                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => dispatch(setIsAddingNewAddress(false))}
                    className="button px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="button px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                  >
                    Save Address
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Cart Items Section */}
        <div>
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Review Items</h2>
            <div className="space-y-4">
              {itemsToCheckout.map((item) => (
                <div
                  key={item.id}
                  className="flex items-start gap-4 py-4 border-b last:border-0"
                >
                  {item.product && (
                    <>
                      <img
                        src={item.product.images.main}
                        alt={item.product.name}
                        className="w-20 h-20 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium">{item.product.name}</h3>
                        {item.variant && (
                          <p className="text-sm text-gray-500">
                            Weight: {item.variant.weight}
                          </p>
                        )}
                        <div className="mt-2 flex items-center gap-2">
                          {/* Quantity controls only for cart checkout */}
                          {!buyNowItem && (
                            <>
                              <button
                                onClick={() =>
                                  handleUpdateQuantity(item.id, item.quantity - 1)
                                }
                                className="button p-1 rounded-md hover:bg-gray-100"
                                disabled={itemLoading[item.id]}
                              >
                                <Minus className="w-4 h-4" />
                              </button>
                              <span className="w-8 text-center">{item.quantity}</span>
                              <button
                                onClick={() =>
                                  handleUpdateQuantity(item.id, item.quantity + 1)
                                }
                                className="button p-1 rounded-md hover:bg-gray-100"
                                disabled={itemLoading[item.id]}
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleRemoveItem(item.id)}
                                className="button p-1 text-red-500 hover:bg-red-50 rounded-md ml-2"
                                disabled={itemLoading[item.id]}
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">
                          ₹{(item.variant?.price || 0) * item.quantity}
                        </p>
                        {item.variant?.discount && item.variant.discount > 0 && (
                          <p className="text-sm text-green-600">
                            {item.variant.discount}% off
                          </p>
                        )}
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal <span className="text-xs ">(including GST)</span></span>
                <span>₹{localOrderSummary.subtotal.toFixed(2)}</span>
              </div>
              {/* <div className="flex justify-between">
                <span>GST (18%)</span>
                <span>₹{localOrderSummary.tax.toFixed(2)}</span>
              </div> */}
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>
                  {localOrderSummary.shipping === 0
                    ? "Free"
                    : `₹${localOrderSummary.shipping.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between font-semibold text-lg pt-2 border-t">
                <span>Total</span>
                <span>₹{localOrderSummary.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-50 text-red-600 rounded-md">
          {error}
        </div>
      )}

      {!isAddingNewAddress && (
        <div className="mt-8 flex justify-end">
          <button
            onClick={handleContinue}
            className="button px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
          >
            Continue to Review
          </button>
        </div>
      )}
    </div>
  );
};
