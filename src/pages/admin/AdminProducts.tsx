import { useState } from "react";
import { FiPlus, FiEdit2, FiTrash2, FiSearch, FiX } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const AdminProducts = () => {
  const navigate = useNavigate();
  // Initial products data
  const initialProducts = [
    {
      id: 1,
      name: "Premium Desi Ghee",
      description: "Pure cow's milk ghee made using traditional methods",
      price: "12.99",
      stock: 56,
      category: "Ghee",
      variants: [
        { id: 101, size: "250ml", price: "6.99", stock: 30 },
        { id: 102, size: "500ml", price: "12.99", stock: 56 },
        { id: 103, size: "1L", price: "22.99", stock: 15 },
      ],
      status: "active",
      sku: "GHEE-001",
      origin: "India",
    },
    {
      id: 2,
      name: "Organic Wild Honey",
      description: "Raw, unfiltered honey from wild forest bees",
      price: "9.99",
      stock: 42,
      category: "Honey",
      variants: [
        { id: 201, size: "200g", price: "5.99", stock: 25 },
        { id: 202, size: "500g", price: "9.99", stock: 42 },
        { id: 203, size: "1kg", price: "17.99", stock: 10 },
      ],
      status: "active",
      sku: "HONEY-001",
      floralSource: "Multiflora",
    },
    {
      id: 3,
      name: "Cold-Pressed Coconut Oil",
      description: "Virgin coconut oil extracted without heat",
      price: "14.99",
      stock: 38,
      category: "Oil",
      variants: [
        { id: 301, size: "250ml", price: "7.99", stock: 20 },
        { id: 302, size: "500ml", price: "14.99", stock: 38 },
        { id: 303, size: "1L", price: "25.99", stock: 12 },
      ],
      status: "active",
      sku: "OIL-001",
      extractionMethod: "Cold Pressed",
    },
    {
      id: 4,
      name: "A2 Bilona Ghee",
      description: "Traditional hand-churned ghee from A2 milk",
      price: "18.99",
      stock: 22,
      category: "Ghee",
      variants: [
        { id: 401, size: "250ml", price: "9.99", stock: 15 },
        { id: 402, size: "500ml", price: "18.99", stock: 22 },
        { id: 403, size: "1L", price: "34.99", stock: 8 },
      ],
      status: "active",
      sku: "GHEE-002",
      origin: "India",
    },
    {
      id: 5,
      name: "Manuka Honey MGO 100+",
      description: "Premium New Zealand Manuka honey with certified activity",
      price: "29.99",
      stock: 18,
      category: "Honey",
      variants: [
        { id: 501, size: "250g", price: "19.99", stock: 10 },
        { id: 502, size: "500g", price: "29.99", stock: 18 },
      ],
      status: "active",
      sku: "HONEY-002",
      floralSource: "Manuka",
      mgoRating: "100+",
    },
    {
      id: 6,
      name: "Extra Virgin Olive Oil",
      description: "First cold pressed premium olive oil",
      price: "16.99",
      stock: 30,
      category: "Oil",
      variants: [
        { id: 601, size: "250ml", price: "8.99", stock: 15 },
        { id: 602, size: "500ml", price: "16.99", stock: 30 },
        { id: 603, size: "750ml", price: "22.99", stock: 10 },
      ],
      status: "active",
      sku: "OIL-002",
      origin: "Italy",
      acidity: "<0.5%",
    },
  ];

  // State management
  const [products, setProducts] = useState(initialProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<{
    id: number | null;
    name: string;
    price: string;
    stock: string | number;
    category: string;
    description?: string;
    status?: string;
    sku?: string;
  }>({
    id: null,
    name: "",
    price: "",
    stock: "",
    category: "",
  });
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<{
    id: number;
    name: string;
    price: string;
    stock: number;
    category: string;
  } | null>(null);

  // Filter products based on search and category
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All Categories" ||
      product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Form handlers
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setCurrentProduct({
      ...currentProduct,
      [name]: value,
    });
  };

  // Form submission handler
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (currentProduct.id) {
      // Update existing product
      setProducts(
        products.map((product) =>
          product.id === currentProduct.id
            ? {
                ...product,
                name: currentProduct.name,
                description: currentProduct.description || "",
                category: currentProduct.category,
                price: currentProduct.price,
                stock: Number(currentProduct.stock),
                status: currentProduct.status || "active",
                sku: currentProduct.sku || "",
              }
            : product
        )
      );
    } else {
      // Add new product
      const newProduct = {
        id: Math.max(...products.map((p) => p.id)) + 1,
        name: currentProduct.name,
        description: currentProduct.description || "",
        price: currentProduct.price,
        stock: Number(currentProduct.stock),
        category: currentProduct.category,
        variants: [],
        status: "active",
        sku: currentProduct.sku || "",
        origin: "",
      };
      setProducts([...products, newProduct]);
    }

    closeModal();
  };

  // Edit product handler
  const handleEdit = (product: (typeof initialProducts)[number]) => {
    setCurrentProduct({ ...product });
    setIsModalOpen(true);
  };

  // Delete confirmation
  const confirmDelete = (product: (typeof initialProducts)[number]) => {
    setProductToDelete(product);
    setIsDeleteConfirmOpen(true);
  };

  // Delete product handler
  const handleDelete = () => {
    setProducts(
      products.filter(
        (product) => productToDelete && product.id !== productToDelete.id
      )
    );
    setIsDeleteConfirmOpen(false);
  };

  // Open modal for new product
  const openAddModal = () => {
    setCurrentProduct({
      id: null,
      name: "",
      price: "",
      stock: "",
      category: "",
    });
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentProduct({
      id: null,
      name: "",
      price: "",
      stock: "",
      category: "",
    });
  };

  const handleProductClick = (productId: number) => {
    navigate(`/admin/products/${productId}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Product Management</h1>
        <button
          onClick={openAddModal}
          className="bg-blue-600 text-white px-4 py-2 rounded flex items-center hover:bg-blue-700 transition-colors"
        >
          <FiPlus className="mr-2" /> Add Product
        </button>
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex justify-between mb-4">
          <div className="relative w-64">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              className="pl-10 pr-4 py-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option>All Categories</option>
            <option>Ghee</option>
            <option>Honey</option>
            <option>Oils</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stock
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProducts.map((product) => (
                <tr key={product.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleProductClick(product.id)}
                      className="text-blue-600 hover:text-blue-800 hover:underline"
                    >
                      {product.name}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleProductClick(product.id)}
                      className="text-blue-600 hover:text-blue-800 hover:underline"
                    >
                      ${product.price}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleProductClick(product.id)}
                      className="text-blue-600 hover:text-blue-800 hover:underline"
                    >
                      {product.stock}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleProductClick(product.id)}
                      className="text-blue-600 hover:text-blue-800 hover:underline"
                    >
                      {product.category}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap flex space-x-2">
                    <button
                      onClick={() => handleEdit(product)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <FiEdit2 />
                    </button>
                    <button
                      onClick={() => confirmDelete(product)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <FiTrash2 />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl">
            {/* Modal Header */}
            <div className="flex justify-between items-center border-b p-6">
              <div>
                <h2 className="text-2xl font-semibold text-gray-800">
                  {currentProduct.id ? "Edit Product" : "Add New Product"}
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  {currentProduct.id
                    ? "Update existing product details"
                    : "Fill in the details for a new product"}
                </p>
              </div>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100"
                aria-label="Close modal"
              >
                <FiX size={24} />
              </button>
            </div>

            {/* Form Content */}
            <form onSubmit={handleSubmit} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left Column - Basic Information */}
                <div className="space-y-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-lg font-medium text-gray-800 mb-4">
                      Basic Information
                    </h3>

                    {/* Product Name */}
                    <div className="mb-5">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Product Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={currentProduct.name}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-md px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="e.g. Ghee"
                        required
                      />
                    </div>

                    {/* Description */}
                    <div className="mb-5">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description
                      </label>
                      <textarea
                        name="description"
                        value={currentProduct.description || ""}
                        onChange={handleInputChange}
                        rows={3}
                        className="w-full border border-gray-300 rounded-md px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="Detailed product description..."
                      />
                    </div>

                    {/* Category */}
                    <div className="mb-5">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Category <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="category"
                        value={currentProduct.category}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-md px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none bg-white bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNjYmNiY2IiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1jaGV2cm9uLWRvd24iPjxwYXRoIGQ9Im02IDkgNiA2IDYtNiIvPjwvc3ZnPg==')] bg-no-repeat bg-[center_right_1rem]"
                        required
                      >
                        <option value="">Select category</option>
                        <option value="Ghee">Ghee</option>
                        <option value="Oils">Oils</option>
                        <option value="Honey">Honey</option>
                      </select>
                    </div>

                    {/* Status */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Status
                      </label>
                      <div className="flex space-x-6">
                        <label className="inline-flex items-center">
                          <input
                            type="radio"
                            name="status"
                            value="active"
                            checked={currentProduct.status === "active"}
                            onChange={handleInputChange}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                          />
                          <span className="ml-2.5 text-gray-700">Active</span>
                        </label>
                        <label className="inline-flex items-center">
                          <input
                            type="radio"
                            name="status"
                            value="inactive"
                            checked={currentProduct.status === "inactive"}
                            onChange={handleInputChange}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                          />
                          <span className="ml-2.5 text-gray-700">Inactive</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column - Pricing & Inventory */}
                <div className="space-y-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-lg font-medium text-gray-800 mb-4">
                      Pricing & Inventory
                    </h3>

                    {/* Price */}
                    <div className="mb-5">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Price <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                          $
                        </span>
                        <input
                          type="number"
                          name="price"
                          value={currentProduct.price}
                          onChange={handleInputChange}
                          className="w-full border border-gray-300 rounded-md pl-9 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          step="0.01"
                          min="0"
                          placeholder="0.00"
                          required
                        />
                      </div>
                    </div>

                    {/* Stock */}
                    <div className="mb-5">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Stock Quantity <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        name="stock"
                        value={currentProduct.stock}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-md px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        min="0"
                        placeholder="0"
                        required
                      />
                    </div>

                    {/* SKU */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        SKU (Stock Keeping Unit)
                      </label>
                      <input
                        type="text"
                        name="sku"
                        value={currentProduct.sku || ""}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-md px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="e.g. PROD-1001"
                      />
                    </div>
                  </div>

                  {/* Image Upload Section */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-lg font-medium text-gray-800 mb-4">
                      Product Images
                    </h3>

                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <svg
                          className="mx-auto h-12 w-12 text-gray-400"
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 48 48"
                          aria-hidden="true"
                        >
                          <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <div className="mt-4 flex text-sm text-gray-600">
                          <label
                            htmlFor="file-upload"
                            className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                          >
                            <span>Upload files</span>
                            <input
                              id="file-upload"
                              name="file-upload"
                              type="file"
                              className="sr-only"
                              multiple
                              accept="image/*"
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">
                          PNG, JPG, GIF up to 10MB each
                        </p>
                      </div>
                    </div>

                    {/* Image Thumbnails (if editing existing product) */}
                    {currentProduct.id && (
                      <div className="mt-4 grid grid-cols-4 gap-2">
                        {/* Sample thumbnails - replace with actual images */}
                        <div className="border rounded-md p-1">
                          <img
                            src="https://via.placeholder.com/100"
                            alt="Product"
                            className="h-20 w-full object-contain"
                          />
                        </div>
                        <div className="border rounded-md p-1">
                          <img
                            src="https://via.placeholder.com/100"
                            alt="Product"
                            className="h-20 w-full object-contain"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Form Footer */}
              <div className="flex justify-end space-x-4 pt-8 border-t mt-8">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-6 py-2.5 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  {currentProduct.id ? "Save Changes" : "Create Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

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
                <span className="font-semibold">{productToDelete?.name}</span>?
                This action cannot be undone.
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

export default AdminProducts;
