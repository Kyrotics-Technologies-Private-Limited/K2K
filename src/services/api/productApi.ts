/*import { Product } from '../../types';
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
  };*/

  // src/services/api/productApi.ts
// src/services/api/productApi.ts
import api from "./api";
import { Product } from "../../types/index"; // adjust this path based on your project structure

// const BASE_URL = "http://localhost:5566/api/products";

export const productApi = {
  // CREATE a new product
  createProduct: async (product: Omit<Product, "id">) => {
    const response = await api.post(`/products/create`, product);
    return response.data as Product;
  },

  // GET all products
  getAllProducts: async (): Promise<Product[]> => {
    const response = await api.get<Product[] | { products?: Product[] }>(`/products`);
    const data = response.data;
    if (Array.isArray(data)) return data;
    if (data && typeof data === 'object' && Array.isArray((data as { products?: Product[] }).products)) {
      return (data as { products: Product[] }).products;
    }
    return [];
  },

  // GET single product by ID
  getProductById: async (id: string): Promise<Product> => {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },

  // UPDATE product
  updateProduct: async (
    id: string,
    updatedProduct: Partial<Omit<Product, "id">>
  ): Promise<Product> => {
    const response = await api.put(`/products/${id}`, updatedProduct);
    return response.data;
  },

  // DELETE product
  deleteProduct: async (id: string): Promise<{ message: string }> => {
    const response = await api.delete(`/products/${id}`);
    return response.data;
  },

  fetchProducts: async () => {
    const response = await api.get(`/products`);
    return response.data; // Assuming the products are in response.data
  },
};