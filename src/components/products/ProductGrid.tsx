import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Product, FilterState, SortOption } from '../../types';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  products: Product[];
}

export const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
  const [searchParams] = useSearchParams();
  const [activeCategory, setActiveCategory] = useState('All');

  const [filters] = useState<FilterState>({
    category: [],
    priceRange: [0, 10000],
    availability: ['in_stock', 'low_stock'],
    searchQuery: '',
    sortBy: 'popularity' as SortOption,
  });

  // Update active category based on URL parameter
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      setActiveCategory(categoryParam);
    } else {
      setActiveCategory('All');
    }
  }, [searchParams]);

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