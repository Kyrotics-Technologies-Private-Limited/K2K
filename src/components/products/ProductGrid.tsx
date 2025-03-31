import React, { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { Product, FilterState, SortOption } from '../../types';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  products: Product[];
}

export const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
  const [filters, setFilters] = useState<FilterState>({
    category: [],
    priceRange: [0, 10000],
    availability: ['in_stock', 'low_stock'],
    searchQuery: '',
    sortBy: 'popularity' as SortOption,
  });

  const categories = ['All', 'honey', 'ghee', 'oils'];
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProducts = useMemo(() => {
    return products
      .filter(product => {
        const matchesSearch = product.name
          .toLowerCase()
          .includes(filters.searchQuery.toLowerCase());
        const matchesCategory = activeCategory === 'All' || 
          product.category === activeCategory;
        return matchesSearch && matchesCategory;
      })
      
  }, [products, filters, activeCategory]);

  return (
    <div className="bg-inherit">
      {/* Category Filters */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-4 py-6">
        {/* Category Filters */}
        <div className="flex flex-wrap gap-3 justify-center">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-full transition-all ${
                activeCategory === category
                  ? 'bg-green-800 text-white'
                  : 'bg-white hover:bg-gray-50'
              }`}
            >
              {category}
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
      </div>
    </div>
  );
};