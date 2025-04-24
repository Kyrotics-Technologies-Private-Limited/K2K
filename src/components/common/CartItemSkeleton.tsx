import React from "react";

export const CartItemSkeleton: React.FC = () => {
  return (
    <div className="px-6 py-4 border-b border-gray-200 last:border-0">
      <div className="flex gap-4">
        {/* Image skeleton */}
        <div className="w-20 h-20 bg-gray-200 rounded-lg animate-pulse" />

        <div className="flex-1">
          {/* Title skeleton */}
          <div className="h-5 w-3/4 bg-gray-200 rounded animate-pulse mb-2" />

          {/* Variant skeleton */}
          <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse mb-4" />

          {/* Quantity controls skeleton */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gray-200 rounded animate-pulse" />
              <div className="w-8 h-8 bg-gray-200 rounded animate-pulse" />
              <div className="w-8 h-8 bg-gray-200 rounded animate-pulse" />
            </div>
            <div className="w-8 h-8 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>

        {/* Price skeleton */}
        <div className="text-right">
          <div className="h-5 w-20 bg-gray-200 rounded animate-pulse mb-2" />
          <div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>
    </div>
  );
};
