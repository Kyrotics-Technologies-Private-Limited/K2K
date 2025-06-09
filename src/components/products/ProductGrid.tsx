import React, { useState, useMemo, useEffect } from 'react';
import { Search } from 'lucide-react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Product, FilterState, SortOption } from '../../types';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  products: Product[];
}

export const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [activeCategory, setActiveCategory] = useState('All');

  const [filters, setFilters] = useState<FilterState>({
    category: [],
    priceRange: [0, 10000],
    availability: ['in_stock', 'low_stock'],
    searchQuery: '',
    sortBy: 'popularity' as SortOption,
  });

  const categories = ['All', 'honey', 'ghee', 'oils'];

  // Update active category based on URL parameter
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      setActiveCategory(categoryParam);
    } else {
      setActiveCategory('All');
    }
  }, [searchParams]);

  // Handle category button click
  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
    if (category === 'All') {
      navigate('/all-products');
    } else {
      navigate(`/all-products?category=${category.toLowerCase()}`);
    }
  };

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(filters.searchQuery.toLowerCase());
      const matchesCategory = activeCategory === 'All' || 
        product.category.toLowerCase() === activeCategory.toLowerCase();
      return matchesSearch && matchesCategory;
    });
  }, [products, filters.searchQuery, activeCategory]);

  return (
    <div className="bg-inherit">
      {/* Category Filters */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-4 py-6">
        <div className="flex flex-wrap gap-3 justify-center">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => handleCategoryClick(category)}
              className={`button px-6 py-2 rounded-full border-2 border-green-700 transition-all ${
                activeCategory === category
                  ? 'bg-[#0d6b1e] text-[#FFD87D]'
                  : 'bg-white hover:bg-gray-50'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </div>
  
      {/* Product Grid */}
      <div className="py-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        {/* No products found message */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-600">No products found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
};