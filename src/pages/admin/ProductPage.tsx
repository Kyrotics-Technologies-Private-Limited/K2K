import { useState } from "react";
import ProductsTable from "../../components/admin/ProductsTable";
import ProductDetailsModal from "../../components/admin/ProductDetailsModal";
import "react-toastify/dist/ReactToastify.css";


interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: string;
  image: string;
}

const products: Product[] = [
  {
    id: 1,
    name: "Ghee",
    category: "ghee",
    price: 5,
    stock: 4,
    status: "In Stock",
    image:
      "https://images.unsplash.com/photo-1573812461383-e5f8b759d12e?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Honey",
    category: "honey",
    price: 7,
    stock: 2,
    status: "Low Stock",
    image:
      "https://media.istockphoto.com/id/951693930/photo/honey.webp?a=1&b=1&s=612x612&w=0&k=20&c=m9BTZH859J4646CwEfmwXTteNhJ4jRBwOZQ5tLUcp8g=",
  },
  {
    id: 3,
    name: "Oil",
    category: "oil",
    price: 4,
    stock: 5,
    status: "In Stock",
    image:
      "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?q=80&w=2036&auto=format&fit=crop",
  },
  {
    id: 4,
    name: "Green Tea",
    category: "tea",
    price: 5,
    stock: 7,
    status: "In Stock",
    image:
      "https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Z3JlZW4lMjB0ZWF8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: 5,
    name: "Herbal Tea",
    category: "herbal",
    price: 29,
    stock: 3,
    status: "Low Stock",
    image:
      "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aGVyYmFsJTIwdGVhfGVufDB8fDB8fHww",
  },
];

const ProductPage = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);

 
  const handleProductClick = (product: Product) => setSelectedProduct(product);

 
  const handleCloseModal = () => setSelectedProduct(null);

  
 


  
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(query) ||  product.category.toLowerCase().includes(query) || product.status.toLowerCase().includes(query)
    );

    setFilteredProducts(filtered);

    //showToast(`Filtered products by "${query}"`, "success");
  };

  // Filter products by category
  const filterByCategory = (category: string) => {
    if (category === "all") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(
        products.filter((product) => product.category === category)
      );
    }

    //showToast(`Filtered by category: "${category}"`, "success");
  };

  return (
    <div className="container mx-auto p-6 bg-white min-h-screen rounded-lg shadow-lg">
      <h1 className="text-4xl font-extrabold mb-6 text-blue-600">
        Product Management
      </h1>

      
      <div className="flex items-center mb-6 gap-4">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={handleSearch}
          className="p-3 w-1/3 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
        />

        <select
          onChange={(e) => filterByCategory(e.target.value)}
          className="p-3 border border-blue-300 rounded-lg bg-blue-50"
        >
          <option value="all">All Categories</option>
          <option value="ghee">Ghee</option>
          <option value="honey">Honey</option>
          <option value="oil">Oil</option>
        </select>
      </div>

    
      <div className="bg-gray-50 p-4 rounded-lg shadow-md">
        <ProductsTable
          products={filteredProducts}
          onProductClick={handleProductClick}
          enablePagination
          enableSorting
          rowHoverEffect={true} 
        />
      </div>

      
      {selectedProduct && (
        <div className="animate-fadeIn">
          <ProductDetailsModal
            product={selectedProduct}
            onClose={handleCloseModal}
          />
        </div>
      )}

      
      
    </div>
  );
};

export default ProductPage;
