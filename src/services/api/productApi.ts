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