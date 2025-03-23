import { useState } from "react";

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: string;
  image: string;
}

interface ProductsTableProps {
  products: Product[];
  onProductClick: (product: Product) => void;
  enablePagination?: boolean;
  enableSorting?: boolean; 
  rowHoverEffect?: boolean;
}

const ProductsTable: React.FC<ProductsTableProps> = ({
  products,
  onProductClick,
  enablePagination,
  enableSorting, 
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<keyof Product | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const itemsPerPage = 5;

 
  const handleSort = (column: keyof Product) => {
    if (!enableSorting) return; 
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("asc");
    }
  };

  const sortedProducts = enableSorting
    ? [...products].sort((a, b) => {
        if (!sortBy) return 0;

        const valueA = a[sortBy];
        const valueB = b[sortBy];

        if (typeof valueA === "string" && typeof valueB === "string") {
          return sortOrder === "asc"
            ? valueA.localeCompare(valueB)
            : valueB.localeCompare(valueA);
        } else if (typeof valueA === "number" && typeof valueB === "number") {
          return sortOrder === "asc" ? valueA - valueB : valueB - valueA;
        }

        return 0;
      })
    : products;

  const paginatedProducts = enablePagination
    ? sortedProducts.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      )
    : sortedProducts;

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <table className="w-full text-left">
        <thead>
          <tr className="bg-green-400 text-white">
            <th
              className={`py-2 px-4 ${enableSorting ? "cursor-pointer" : ""}`}
              onClick={() => handleSort("name")}
            >
              Name {sortBy === "name" && (sortOrder === "asc" ? "▲" : "▼")}
            </th>
            <th
              className={`py-2 px-4 ${enableSorting ? "cursor-pointer" : ""}`}
              onClick={() => handleSort("price")}
            >
              Price {sortBy === "price" && (sortOrder === "asc" ? "▲" : "▼")}
            </th>
            <th
              className={`py-2 px-4 ${enableSorting ? "cursor-pointer" : ""}`}
              onClick={() => handleSort("stock")}
            >
              Stock {sortBy === "stock" && (sortOrder === "asc" ? "▲" : "▼")}
            </th>
            <th className="py-2 px-4">Status</th>
          </tr>
        </thead>
        <tbody>
          {paginatedProducts.map((product) => (
            <tr
              key={product.id}
              className="hover:bg-green-50 cursor-pointer"
              onClick={() => onProductClick(product)}
            >
              <td className="py-2 px-4">{product.name}</td>
              <td className="py-2 px-4">${product.price.toFixed(2)}</td>
              <td className="py-2 px-4">{product.stock}</td>
              <td className="py-2 px-4">{product.status}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      {enablePagination && (
        <div className="flex justify-center mt-4 space-x-2">
          <button
            className="bg-green-400 text-white px-3 py-1 rounded"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          >
            Previous
          </button>
          <span className="py-1">Page {currentPage}</span>
          <button
            className="bg-green-400 text-white px-3 py-1 rounded"
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductsTable;
