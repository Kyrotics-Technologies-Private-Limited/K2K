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

  const categories = ['All', 'Honey', 'Ghee', 'Oil'];
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProducts = useMemo(() => {
    return products
      .filter(product => {
        const matchesSearch = product.name
          .toLowerCase()
          .includes(filters.searchQuery.toLowerCase());
        const matchesCategory = activeCategory === 'All' || 
          product.category.toLowerCase() === activeCategory.toLowerCase();
        return matchesSearch && matchesCategory;
      })
      .sort((a, b) => {
        switch (filters.sortBy) {
          case 'price_high':
            return b.price.amount - a.price.amount;
          case 'price_low':
            return a.price.amount - b.price.amount;
          case 'popularity':
            return b.ratings - a.ratings;
          case 'newest':
            return new Date(b.id).getTime() - new Date(a.id).getTime();
          default:
            return 0;
        }
      });
  }, [products, filters, activeCategory]);

  return (
    <div className="min-h-screen bg-inherit max-w-7xl">
      <div className="mx-auto ">
        {/* Header */}
        <div 
          className="relative rounded-xl shadow-lg p-8 my-8 bg-cover bg-center h-[300px]"
          style={{
            backgroundImage: 'url("https://picsum.photos/2000/1000")',
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50 rounded-xl"></div>
          <div className="relative z-10 text-center">
            <p className="text-white font-medium mb-2">Pure. Natural. Authentic.</p>
            <h1 className="text-4xl font-bold text-white mb-4">Our Natural Products</h1>
            <p className="text-gray-100 max-w-2xl mx-auto">
              Carefully sourced from nature, minimally processed, and delivered fresh to your door. Each
              product maintains its natural goodness and nutritional integrity.
            </p>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4  py-6">
          {/* Category Filters */}
          <div className="flex flex-wrap gap-3">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2 rounded-full transition-all ${
                  activeCategory === category
                    ? 'bg-[#4A5D23] text-white'
                    : 'bg-white hover:bg-gray-50'
                }`}
              >
                {category}
              </button>
              ))}
              </div>
    
              {/* Search Bar */}
              <div className="w-full md:w-[300px]">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={filters.searchQuery}
                    onChange={(e) => setFilters(prev => ({ ...prev, searchQuery: e.target.value }))}
                    className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#4A5D23]"
                  />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
              </div>
            </div>
    
        
        {/* Product Grid */}
        <div className="py-5 md:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-20 justify-items-center">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};