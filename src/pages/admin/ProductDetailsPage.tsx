import { useState, useEffect } from "react";
import { FiEdit2, FiTrash2, FiArrowLeft, FiSave, FiX } from "react-icons/fi";
import { useNavigate, useLocation } from "react-router-dom";

// AdminProduct interface for the admin panel
interface AdminProduct {
  id: number;
  name: string;
  description: string;
  originalPrice: string;
  stock: number;
  category: string;
  status: "active" | "inactive";
  sku: string;
  images: {
    main: string;
    gallery: string[];
    banner: string;
  };
  variants: Array<{
    id: number;
    size: string;
    price: string;
    stock: number;
  }>;
  [key: string]: any; // Allow additional properties
}

const ProductDetailsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const productId = location.pathname.split("/").pop();

  // In a real app, you would fetch this product from an API
  // For now, we'll use mock data similar to your initial setup
  const initialProducts: AdminProduct[] = [
    {
      id: 1,
      name: "Premium Desi Ghee",
      description: "Pure cow's milk ghee made using traditional methods",
      originalPrice: "12.99",
      stock: 56,
      category: "Ghee",
      variants: [
        { id: 101, size: "250ml", price: "6.99", stock: 30 },
        { id: 102, size: "500ml", price: "12.99", stock: 56 },
        { id: 103, size: "1L", price: "22.99", stock: 15 },
      ],
      status: "active",
      sku: "GHEE-001",
      images: {
        main: "",
        gallery: [],
        banner: "",
      },
      origin: "India",
    },
    {
      id: 2,
      name: "Organic Wild Honey",
      description: "Raw, unfiltered honey from wild forest bees",
      originalPrice: "9.99",
      stock: 42,
      category: "Honey",
      variants: [
        { id: 201, size: "200g", price: "5.99", stock: 25 },
        { id: 202, size: "500g", price: "9.99", stock: 42 },
        { id: 203, size: "1kg", price: "17.99", stock: 10 },
      ],
      status: "active",
      sku: "HONEY-001",
      images: {
        main: "",
        gallery: [],
        banner: "",
      },
      floralSource: "Multiflora",
    },
    {
      id: 3,
      name: "Cold-Pressed Coconut Oil",
      description: "Virgin coconut oil extracted without heat",
      originalPrice: "14.99",
      stock: 38,
      category: "Oil",
      variants: [
        { id: 301, size: "250ml", price: "7.99", stock: 20 },
        { id: 302, size: "500ml", price: "14.99", stock: 38 },
        { id: 303, size: "1L", price: "25.99", stock: 12 },
      ],
      status: "active",
      sku: "OIL-001",
      images: {
        main: "",
        gallery: [],
        banner: "",
      },
      extractionMethod: "Cold Pressed",
    },
    {
      id: 4,
      name: "A2 Bilona Ghee",
      description: "Traditional hand-churned ghee from A2 milk",
      originalPrice: "18.99",
      stock: 22,
      category: "Ghee",
      variants: [
        { id: 401, size: "250ml", price: "9.99", stock: 15 },
        { id: 402, size: "500ml", price: "18.99", stock: 22 },
        { id: 403, size: "1L", price: "34.99", stock: 8 },
      ],
      status: "active",
      sku: "GHEE-002",
      images: {
        main: "",
        gallery: [],
        banner: "",
      },
      origin: "India",
    },
    {
      id: 5,
      name: "Manuka Honey MGO 100+",
      description: "Premium New Zealand Manuka honey with certified activity",
      originalPrice: "29.99",
      stock: 18,
      category: "Honey",
      variants: [
        { id: 501, size: "250g", price: "19.99", stock: 10 },
        { id: 502, size: "500g", price: "29.99", stock: 18 },
      ],
      status: "active",
      sku: "HONEY-002",
      images: {
        main: "",
        gallery: [],
        banner: "",
      },
      floralSource: "Manuka",
      mgoRating: "100+",
    },
    {
      id: 6,
      name: "Extra Virgin Olive Oil",
      description: "First cold pressed premium olive oil",
      originalPrice: "16.99",
      stock: 30,
      category: "Oil",
      variants: [
        { id: 601, size: "250ml", price: "8.99", stock: 15 },
        { id: 602, size: "500ml", price: "16.99", stock: 30 },
        { id: 603, size: "750ml", price: "22.99", stock: 10 },
      ],
      status: "active",
      sku: "OIL-002",
      images: {
        main: "",
        gallery: [],
        banner: "",
      },
      origin: "Italy",
      acidity: "<0.5%",
    },
  ];

  console.log("Product ID:", productId);
  const [product, setProduct] = useState<AdminProduct | undefined>(
    initialProducts.find((p) => p.id === Number(productId))
  );
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [formData, setFormData] = useState<AdminProduct | undefined>(product);

  useEffect(() => {
    if (!productId) {
      navigate("/admin/products");
      return;
    }

    const product = initialProducts.find((p) => p.id === Number(productId));
    if (product) {
      setProduct(product);
      setFormData(product);
    }
  }, [productId, navigate]);

  if (!product) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Product not found</p>
      </div>
    );
  }

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev!,
      [name]: value,
    }));
  };

  const handleVariantChange = (
    variantId: number,
    field: string,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev!,
      variants: prev!.variants?.map((variant) =>
        variant.id === variantId ? { ...variant, [field]: value } : variant
      ),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData) {
      setProduct(formData);
      // In a real app, you would save to API here
      setIsEditing(false);
    }
  };

  const handleDelete = () => {
    // In a real app, you would delete from API here
    navigate("/admin/products");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <button
          onClick={() => navigate("/admin/products")}
          className="flex items-center text-blue-600 hover:text-blue-800"
        >
          <FiArrowLeft className="mr-2" /> Back to Products
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={formData?.name}
                  onChange={handleInputChange}
                  className="border-b border-gray-300 focus:border-blue-500 focus:outline-none"
                />
              ) : (
                product.name
              )}
            </h1>
            <p className="text-sm text-gray-500">
              SKU:{" "}
              {isEditing ? (
                <input
                  type="text"
                  name="sku"
                  value={formData?.sku || ""}
                  onChange={handleInputChange}
                  className="border-b border-gray-300 focus:border-blue-500 focus:outline-none"
                />
              ) : (
                product.sku
              )}
            </p>
          </div>
          <div className="flex space-x-2">
            {!isEditing ? (
              <>
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  <FiEdit2 className="mr-2" /> Edit
                </button>
                <button
                  onClick={() => setIsDeleteConfirmOpen(true)}
                  className="flex items-center px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  <FiTrash2 className="mr-2" /> Delete
                </button>
              </>
            ) : (
              <button
                onClick={handleSubmit}
                className="flex items-center px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                <FiSave className="mr-2" /> Save Changes
              </button>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
          {/* Left Column - Product Info */}
          <div className="md:col-span-2 space-y-6">
            {/* Description */}
            <div>
              <h2 className="text-lg font-semibold mb-2">Description</h2>
              {isEditing ? (
                <textarea
                  name="description"
                  value={formData?.description}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded p-2 focus:ring-blue-500 focus:border-blue-500"
                  rows={4}
                />
              ) : (
                <p className="text-gray-600">{product.description}</p>
              )}
            </div>

            {/* Variants */}
            {product.variants && product.variants.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold mb-4">Variants</h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Size
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Price
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Stock
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {product.variants.map((variant) => (
                        <tr key={variant.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {isEditing ? (
                              <input
                                type="text"
                                value={variant.size}
                                onChange={(e) =>
                                  handleVariantChange(
                                    variant.id,
                                    "size",
                                    e.target.value
                                  )
                                }
                                className="border-b border-gray-300 focus:border-blue-500 focus:outline-none"
                              />
                            ) : (
                              variant.size
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {isEditing ? (
                              <input
                                type="text"
                                value={variant.price}
                                onChange={(e) =>
                                  handleVariantChange(
                                    variant.id,
                                    "price",
                                    e.target.value
                                  )
                                }
                                className="border-b border-gray-300 focus:border-blue-500 focus:outline-none"
                              />
                            ) : (
                              `$${variant.price}`
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {isEditing ? (
                              <input
                                type="number"
                                value={variant.stock}
                                onChange={(e) =>
                                  handleVariantChange(
                                    variant.id,
                                    "stock",
                                    e.target.value
                                  )
                                }
                                className="border-b border-gray-300 focus:border-blue-500 focus:outline-none w-16"
                              />
                            ) : (
                              variant.stock
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Meta Info */}
          <div className="space-y-6">
            {/* Product Image */}
            <div>
              <h2 className="text-lg font-semibold mb-2">Product Image</h2>
              <div className="border rounded-lg p-4 flex justify-center">
                <div className="w-64 h-64 bg-gray-100 flex items-center justify-center">
                  <span className="text-gray-400">Product Image</span>
                </div>
              </div>
            </div>

            {/* Meta Information */}
            <div>
              <h2 className="text-lg font-semibold mb-2">Meta Information</h2>
              <div className="bg-gray-50 rounded-lg p-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  {isEditing ? (
                    <select
                      name="category"
                      value={formData?.category}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded p-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="Ghee">Ghee</option>
                      <option value="Honey">Honey</option>
                      <option value="Oil">Oil</option>
                    </select>
                  ) : (
                    <p>{product.category}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  {isEditing ? (
                    <select
                      name="status"
                      value={formData?.status}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded p-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  ) : (
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        product.status === "active"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {product.status}
                    </span>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="originalPrice"
                      value={formData?.originalPrice}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded p-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  ) : (
                    <p>${product.originalPrice}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Stock
                  </label>
                  {isEditing ? (
                    <input
                      type="number"
                      name="stock"
                      value={formData?.stock}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded p-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  ) : (
                    <p>{product.stock}</p>
                  )}
                </div>

                {/* Additional properties */}
                {Object.entries(product)
                  .filter(
                    ([key]) =>
                      ![
                        "id",
                        "name",
                        "description",
                        "originalPrice",
                        "stock",
                        "category",
                        "status",
                        "sku",
                        "variants",
                        "images",
                      ].includes(key)
                  )
                  .map(([key, value]) => (
                    <div key={key}>
                      <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                        {key.replace(/([A-Z])/g, " $1").trim()}
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          name={key}
                          value={formData?.[key] || ""}
                          onChange={handleInputChange}
                          className="w-full border border-gray-300 rounded p-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      ) : (
                        <p>{value}</p>
                      )}
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {isDeleteConfirmOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="flex justify-between items-center border-b p-4">
              <h2 className="text-xl font-semibold">Confirm Deletion</h2>
              <button
                onClick={() => setIsDeleteConfirmOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FiX size={24} />
              </button>
            </div>
            <div className="p-4">
              <p className="mb-4">
                Are you sure you want to delete{" "}
                <span className="font-semibold">{product.name}</span>? This
                action cannot be undone.
              </p>
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setIsDeleteConfirmOpen(false)}
                  className="px-4 py-2 border rounded-lg hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailsPage;
