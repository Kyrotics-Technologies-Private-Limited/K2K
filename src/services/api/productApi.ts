import { Product } from '../../types';
import api from './api';


// Product API functions
export const productApi = {
    // Get all products
    getAllProducts: async (): Promise<Product[]> => {
      try {
        const response = await api.get('/products');
        return response.data;
      } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
      }
    },
  
    // Get product by ID
    getProductById: async (id: string): Promise<Product> => {
      try {
        const response = await api.get(`/products/${id}`);
        return response.data;
      } catch (error) {
        console.error(`Error fetching product with ID ${id}:`, error);
        throw error;
      }
    },
  };

//  import { Product } from '../../types';
// import api from './api';

// // Product API functions with better error handling
// export const productApi = {
//   /**
//    * Get all products
//    * @returns Promise<Product[]>
//    */
//   getAllProducts: async (): Promise<Product[]> => {
//     try {
//       const { data } = await api.get('/products');
//       return data;
//     } catch (error) {
//       console.error('Error fetching products:', error);
//       if (error instanceof Error && 'response' in error) {
//         throw new Error((error as any).response?.data?.message || 'Failed to fetch products');
//       }
//       throw new Error('Failed to fetch products');
//     }
//   },

//   /**
//    * Get product by ID
//    * @param id - Product ID
//    * @returns Promise<Product>
//    */
//   getProductById: async (id: string): Promise<Product> => {
//     try {
//       const { data } = await api.get(`/products/${id}`);
//       return data;
//     } catch (error) {
//       console.error(`Error fetching product with ID ${id}:`, error);
//       if (error instanceof Error && 'response' in error) {
//         throw new Error((error as any).response?.data?.message || `Failed to fetch product ${id}`);
//       }
//       throw new Error(`Failed to fetch product ${id}`);
//     }
//   },

//   /**
//    * Create new product
//    * @param productData - Product data without ID
//    * @returns Promise<Product>
//    */
//   createProduct: async (productData: Omit<Product, 'id'>): Promise<Product> => {
//     try {
//       const { data } = await api.post('/products', productData);
//       return data;
//     } catch (error) {
//       console.error('Error creating product:', error);
//       if (error instanceof Error && 'response' in error) {
//         throw new Error((error as any).response?.data?.message || 'Failed to create product');
//       }
//       throw new Error('Failed to create product');
//     }
//   },

//   /**
//    * Update product
//    * @param id - Product ID
//    * @param productData - Partial product data
//    * @returns Promise<Product>
//    */
//   updateProduct: async (id: string, productData: Partial<Product>): Promise<Product> => {
//     try {
//       const { data } = await api.patch(`/products/${id}`, productData); // Using PATCH instead of PUT
//       return data;
//     } catch (error) {
//       console.error(`Error updating product with ID ${id}:`, error);
//       if (error instanceof Error && 'response' in error) {
//         throw new Error((error as any).response?.data?.message || `Failed to update product ${id}`);
//       }
//       throw new Error(`Failed to update product ${id}`);
//     }
//   },

//   /**
//    * Delete product
//    * @param id - Product ID
//    * @returns Promise<void>
//    */
//   deleteProduct: async (id: string): Promise<void> => {
//     try {
//       await api.delete(`/products/${id}`);
//     } catch (error) {
//       console.error(`Error deleting product with ID ${id}:`, error);
//       if (error instanceof Error && 'response' in error) {
//         throw new Error((error as any).response?.data?.message || `Failed to delete product ${id}`);
//       }
//       throw new Error(`Failed to delete product ${id}`);
//     }
//   },

//   /**
//    * Search products
//    * @param query - Search query
//    * @returns Promise<Product[]>
//    */
//   searchProducts: async (query: string): Promise<Product[]> => {
//     try {
//       const { data } = await api.get('/products/search', { params: { q: query } });
//       return data;
//     } catch (error) {
//       console.error('Error searching products:', error);
//       if (error instanceof Error && 'response' in error) {
//         throw new Error((error as any).response?.data?.message || 'Failed to search products');
//       }
//       throw new Error('Failed to search products');
//     }
//   },

//   /**
//    * Get products by category
//    * @param category - Category name
//    * @returns Promise<Product[]>
//    */
//   getProductsByCategory: async (category: string): Promise<Product[]> => {
//     try {
//       const { data } = await api.get('/products/category', { params: { category } });
//       return data;
//     } catch (error) {
//       console.error(`Error fetching products in category ${category}:`, error);
//       if (error instanceof Error && 'response' in error) {
//         throw new Error((error as any).response?.data?.message || `Failed to fetch ${category} products`);
//       }
//       throw new Error(`Failed to fetch ${category} products`);
//     }
//   }
// };