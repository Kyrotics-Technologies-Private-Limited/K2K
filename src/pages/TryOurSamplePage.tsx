import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Package, Truck, Star, CheckCircle } from 'lucide-react';
import { ProductGrid } from '../components/products/ProductGrid';
import { productApi } from '../services/api/productApi';
import { Product } from '../types';

const TryOurSamplePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await productApi.getAllProducts();
        setProducts(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      {/* <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <Link
            to="/all-products"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-green-800 transition-colors duration-200"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to All Products</span>
          </Link>
        </div>
      </div> */}

      {/* Hero Section */}
      <div className="relative">
        <div className="w-full h-64 sm:h-80 md:h-96 lg:h-[500px] overflow-hidden">
          <img 
            src="/assets/tryOurSample/Try_our_sample16_5.png" 
            alt="Try Our Sample Banner" 
            className="w-full h-full object-cover object-center"
          />
        </div>
        
        {/* Try Our Sample Button */}
                {/* Try Our Sample Button */}
                <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
          <Link
            to="/all-products"
            className="bg-green-600 text-white py-3 px-8  rounded-lg font-semibold hover:bg-green-700 transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform duration-200"
          >
            Try Our Sample
          </Link>
        </div>
      </div>

      {/* Product Grid Section */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Try Our Products
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our range of authentic, farm-fresh products. Click on any product to learn more and place your sample order.
          </p>
        </div>
        
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-pulse text-gray-500">Loading products...</div>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-600">{error}</p>
            <button
              className="mt-4 px-4 py-2 bg-green-700 text-white rounded-md hover:bg-green-800"
              onClick={() => window.location.reload()}
            >
              Try Again
            </button>
          </div>
        ) : (
          <ProductGrid products={products} />
        )}
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">

        {/* Benefits Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Why Try Our Samples?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Quality Assurance
              </h3>
              <p className="text-gray-600 text-sm">
                Experience our premium quality before committing to larger quantities
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Free Shipping
              </h3>
              <p className="text-gray-600 text-sm">
                All sample orders include free shipping across India
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Risk-Free Trial
              </h3>
              <p className="text-gray-600 text-sm">
                Try our products without any commitment or subscription
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Perfect Size
              </h3>
              <p className="text-gray-600 text-sm">
                Sample sizes perfect for testing and tasting our products
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-green-600 rounded-2xl p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Experience Quality?
          </h2>
          <p className="text-xl mb-6 text-green-100">
            Order your sample today and taste the difference of authentic, farm-fresh products
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/all-products"
              className="bg-white text-green-600 py-3 px-8 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200"
            >
              Browse All Products
            </Link>
            <Link
              to="/kishanParivarPage"
              className="bg-green-700 text-white py-3 px-8 rounded-lg font-semibold hover:bg-green-800 transition-colors duration-200"
            >
              Join Kishan Parivar
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TryOurSamplePage;
