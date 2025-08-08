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
import { PlusCircle, Trash2, Plus, Minus, Pencil } from "lucide-react";
import { toast } from "react-toastify";

// Indian states list
const INDIAN_STATES = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh",
  "Lakshadweep",
  "Puducherry",
];

export const SelectStep = () => {
  const dispatch = useAppDispatch();
  const { addresses, selectedAddress, isAddingNewAddress } = useAppSelector(
    (state) => state.checkout
  );
  const { buyNowItem, cartItems, activeCartId } = useAppSelector(
    (state) => state.cart
  );
  const {} = useAppSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [itemLoading, setItemLoading] = useState<{ [key: string]: boolean }>(
    {}
  );
  const [editAddress, setEditAddress] = useState<Address | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [addressToDelete, setAddressToDelete] = useState<Address | null>(null);

  const [formData, setFormData] = useState<
    Omit<Address, "id" | "userId" | "createdAt">
  >({
    name: "",
    phone: "",
    appartment: "",
    address: "",
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
    setError(null); // Clear warning when address is selected
  };

  const handleUpdateQuantity = async (itemId: string, newQuantity: number) => {
    if (!activeCartId || newQuantity < 1 || itemLoading[itemId]) return;

    // Find the cart item to get variant information
    const cartItem = cartItems.find((item) => item.id === itemId);
    if (!cartItem || !cartItem.variant) {
      console.error("Cart item or variant not found");
      return;
    }

    // Check stock availability before updating quantity
    const variant = cartItem.variant;
    if (!variant.inStock || variant.units_in_stock <= 0) {
      toast.error("This variant is out of stock");
      return;
    }

    if (newQuantity > variant.units_in_stock) {
      toast.error(
        `Only ${variant.units_in_stock} units available in stock. Requested: ${newQuantity}`
      );
      return;
    }

    try {
      setItemLoading((prev) => ({ ...prev, [itemId]: true }));
      await dispatch(
        updateCartItem({
          cartId: activeCartId,
          itemId,
          itemData: { quantity: newQuantity },
        })
      ).unwrap();
    } catch (error: any) {
      // Handle stock validation errors from server
      if (error.message && error.message.includes("stock")) {
        toast.error(error.message);
      } else {
        console.error("Failed to update quantity:", error);
        toast.error("Failed to update item quantity");
      }
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
    setEditAddress(null);
    dispatch(setIsAddingNewAddress(true));
    setFormData({
      name: "",
      phone: "",
      appartment: "",
      address: "",
      state: "",
      country: "India",
      pincode: "",
      isDefault: !addresses.length,
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Input validation based on field type
    let validatedValue = value;

    switch (name) {
      case "name":
        // Only allow alphabets and spaces for name
        validatedValue = value.replace(/[^a-zA-Z\s]/g, "");
        break;
      case "phone":
        // Only allow numbers for phone (max 10 digits)
        validatedValue = value.replace(/[^0-9]/g, "").slice(0, 10);
        break;
      case "pincode":
        // Only allow numbers for pincode (max 6 digits)
        validatedValue = value.replace(/[^0-9]/g, "").slice(0, 6);
        break;
      default:
        validatedValue = value;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: validatedValue,
    }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Additional validation
    if (formData.phone.length !== 10) {
      setError("Phone number must be exactly 10 digits");
      return;
    }

    if (formData.pincode.length !== 6) {
      setError("Pincode must be exactly 6 digits");
      return;
    }

    if (!formData.name.trim()) {
      setError("Full name is required");
      return;
    }

    if (!formData.state) {
      setError("Please select a state");
      return;
    }

    try {
      setLoading(true);
      setError(null); // Clear any previous errors

      if (editAddress) {
        // Edit mode: update address
        await addressApi.update(editAddress.id, formData);
        // Refetch addresses to get updated list
        const updatedAddresses = await addressApi.getAll();
        dispatch(setAddresses(updatedAddresses));
        // Set selected address to the updated one
        const updated = updatedAddresses.find((a) => a.id === editAddress.id);
        if (updated) dispatch(setSelectedAddress(updated));
        setEditAddress(null);
      } else {
        // Add mode: create new address
        const newAddress = await addressApi.create(formData);
        dispatch(setAddresses([...addresses, newAddress]));
        dispatch(setSelectedAddress(newAddress));
      }
      dispatch(setIsAddingNewAddress(false));
    } catch (err) {
      setError("Failed to save address");
    } finally {
      setLoading(false);
    }
  };

  // When switching to add/edit, prefill formData accordingly
  useEffect(() => {
    if (isAddingNewAddress && editAddress) {
      setFormData(editAddress);
    } else if (!isAddingNewAddress) {
      setEditAddress(null);
    }
  }, [isAddingNewAddress, editAddress]);

  const handleContinue = () => {
    if (!selectedAddress) {
      setError("Please select a delivery address");
      return;
    }
    if (itemsToCheckout.length === 0) {
      setError("No items to checkout");
      return;
    }

    // Validate stock availability for all items before proceeding
    for (const item of itemsToCheckout) {
      if (!item.variant) {
        setError(
          `Variant information missing for ${item.product?.name || "item"}`
        );
        return;
      }

      if (!item.variant.inStock || item.variant.units_in_stock <= 0) {
        setError(
          `${item.product?.name || "Item"} (${
            item.variant.weight
          }) is out of stock`
        );
        return;
      }

      if (item.quantity > item.variant.units_in_stock) {
        setError(
          `${item.product?.name || "Item"} (${item.variant.weight}) - Only ${
            item.variant.units_in_stock
          } units available. Requested: ${item.quantity}`
        );
        return;
      }
    }

    // Always go to the first review step (step 2)
    dispatch(setStep(2));
  };

  useEffect(() => {
    if (showDeleteModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [showDeleteModal]);

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
                      key={address.id}
                      className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                        selectedAddress?.id === address.id
                          ? "border-green-500 bg-green-50"
                          : "border-gray-200 hover:border-green-300"
                      }`}
                      onClick={() => handleSelectAddress(address)}
                    >
                      <div className="flex justify-between items-start gap-2">
                        <div>
                          <h3 className="font-medium">{address.name}</h3>
                          <p className="text-sm text-gray-600">
                            {address.phone}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            type="button"
                            className="text-blue-600 p-1 hover:bg-blue-50 rounded"
                            title="Edit"
                            onClick={(e) => {
                              e.stopPropagation();
                              setFormData({
                                name: address.name,
                                phone: address.phone,
                                appartment: address.appartment,
                                address: address.address,
                                state: address.state,
                                country: address.country,
                                pincode: address.pincode,
                                isDefault: address.isDefault,
                              });
                              setEditAddress(address);
                              dispatch(setIsAddingNewAddress(true));
                            }}
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            className="text-red-600 p-1 hover:bg-red-50 rounded"
                            title="Delete"
                            onClick={(e) => {
                              e.stopPropagation();
                              setAddressToDelete(address);
                              setShowDeleteModal(true);
                            }}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        {address.isDefault && (
                          <span className="text-sm text-green-600 font-medium">
                            Default
                          </span>
                        )}
                      </div>
                      <div className="mt-2 text-sm text-gray-600">
                        <p>{address.appartment}</p>
                        <p>{address.address}</p>
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
                <h2 className="text-xl font-semibold mb-4">
                  {editAddress ? "Edit Address" : "Add New Address"}
                </h2>

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
                      placeholder="Enter full name (alphabets only)"
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
                      placeholder="Enter 10-digit phone number"
                      className={`mt-1 block w-full rounded-md shadow-sm focus:border-green-500 focus:ring-green-500 ${
                        formData.phone && formData.phone.length !== 10
                          ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                          : "border-gray-300"
                      }`}
                    />
                    {formData.phone && formData.phone.length !== 10 && (
                      <p className="mt-1 text-sm text-red-600">
                        Phone number must be exactly 10 digits
                      </p>
                    )}
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
                    name="address"
                    required
                    value={formData.address}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      State
                    </label>
                    <select
                      name="state"
                      required
                      value={formData.state}
                      onChange={handleSelectChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                    >
                      <option value="">Select State</option>
                      {INDIAN_STATES.map((state) => (
                        <option key={state} value={state}>
                          {state}
                        </option>
                      ))}
                    </select>
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
                      placeholder="Enter 6-digit pincode"
                      className={`mt-1 block w-full rounded-md shadow-sm focus:border-green-500 focus:ring-green-500 ${
                        formData.pincode && formData.pincode.length !== 6
                          ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                          : "border-gray-300"
                      }`}
                    />
                    {formData.pincode && formData.pincode.length !== 6 && (
                      <p className="mt-1 text-sm text-red-600">
                        Pincode must be exactly 6 digits
                      </p>
                    )}
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
                    onClick={() => {
                      dispatch(setIsAddingNewAddress(false));
                      setEditAddress(null);
                    }}
                    className="button px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="button px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                  >
                    {editAddress ? "Update Address" : "Save Address"}
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
                                  handleUpdateQuantity(
                                    item.id,
                                    item.quantity - 1
                                  )
                                }
                                className="button p-1 rounded-md hover:bg-gray-100"
                                disabled={itemLoading[item.id]}
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
                                className="button p-1 rounded-md hover:bg-gray-100"
                                disabled={
                                  itemLoading[item.id] ||
                                  (item.variant &&
                                    item.quantity >=
                                      item.variant.units_in_stock)
                                }
                                title={
                                  item.variant &&
                                  item.quantity >= item.variant.units_in_stock
                                    ? `Only ${item.variant.units_in_stock} available`
                                    : "Increase quantity"
                                }
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
                        {item.variant?.discount &&
                          item.variant.discount > 0 && (
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
                <span>
                  Subtotal <span className="text-xs ">(including GST)</span>
                </span>
                <span>₹{localOrderSummary.subtotal.toFixed(2)}</span>
              </div>
              
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

      {/* Delete Confirmation Modal */}
      {showDeleteModal && addressToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 backdrop-blur-sm"
            style={{ zIndex: 49 }}
          />
          <div className="relative bg-green-100 rounded-lg shadow-lg p-6 w-full max-w-sm z-50">
            <h4 className="text-lg font-semibold mb-4">
              Would you like to delete this address?
            </h4>
            <div className="flex justify-end gap-4">
              <button
                className="px-4 py-2 bg-white rounded border border-green-800 hover:bg-green-800 hover:text-white transition-colors"
                onClick={() => {
                  setShowDeleteModal(false);
                  setAddressToDelete(null);
                }}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-green-800 text-white rounded border border-green-800 hover:bg-red-700 hover:border-red-700 transition-colors"
                onClick={async () => {
                  if (addressToDelete) {
                    await addressApi.remove(addressToDelete.id);
                    const updatedAddresses = await addressApi.getAll();
                    dispatch(setAddresses(updatedAddresses));
                    if (selectedAddress?.id === addressToDelete.id) {
                      dispatch(setSelectedAddress(null));
                    }
                  }
                  setShowDeleteModal(false);
                  setAddressToDelete(null);
                }}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
