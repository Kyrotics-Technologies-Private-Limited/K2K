// import { ProductDetail } from "../components/products/ProductDetail";
// import { sampleProducts } from "../mockData/SampleProduct";
// import { useParams } from "react-router-dom";
// import { Product } from "../types";

// const ProductPage = () => {
//   const { id } = useParams<{ id: string }>(); // Get product ID from URL

//   // Find the product with the matching ID
//   const Product: Product | undefined = sampleProducts.find((p) => p.id === id);

//   return (
//     <div>
//       <ProductDetail product={Product} relatedProducts={sampleProducts} />
//     </div>
//   );
// };

// export default ProductPage;

import React, { useState, useEffect } from "react";
import { ProductDetail } from "../components/products/ProductDetail";
import { Product } from "../types/index";
import {productApi} from "../services/api/productApi";
import { useParams, useNavigate } from "react-router-dom";

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProductData = async () => {
      if (!id) return;

      try {
        setLoading(true);
        // Fetch the product details
        const productData = await productApi.getProductById(id);
        setProduct(productData);

        // Fetch all products to get related products
        const allProducts = await productApi.fetchProducts();

        // Filter related products (same category, excluding current product)
        setRelatedProducts(
          allProducts
            .filter((p) => p.id !== id && p.category === productData.category)
            .slice(0, 4) // Limit to 4 related products
        );
        setError(null);
      } catch (err) {
        console.error("Error fetching product:", err);
        setError("Failed to load product. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-700"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center p-4">
        <p className="text-red-600 mb-4">{error || "Product not found"}</p>
        <button
          className="px-4 py-2 bg-green-700 text-white rounded-md hover:bg-green-800"
          onClick={() => navigate("/All-products")}
        >
          Back to Products
        </button>
      </div>
    );
  }

  return (
    <div>
      <ProductDetail product={product} relatedProducts={relatedProducts} />
    </div>
  );
};

export default ProductPage;