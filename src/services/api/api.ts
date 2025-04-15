import axios from 'axios';
import { Product } from '../../types';

// Base URL for the API
const API_BASE_URL = 'http://localhost:5566/api'; // Adjust this to match your backend URL

// Create an axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

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

export default api;