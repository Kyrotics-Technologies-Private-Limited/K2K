import api from './api';
import { Variant } from '../../types/variant'; // Adjust the import path as necessary


const variantApi = {
  // Create a new variant
  createVariant: async (productId: string, variantData: Partial<Variant>) => {
    try {
      const response = await api.post(
        `/variants/${productId}/variants`,
        variantData
      );
      return response.data;
    } catch (error) {
      console.error('Error creating variant:', error);
      throw error;
    }
  },

  // Get all variants for a product
  getProductVariants: async (productId: string): Promise<Variant[]> => {
    try {
      const response = await api.get(
        `/variants/${productId}/getVariants`
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching variants:', error);
      throw error;
    }
  },

  // Get a specific variant
  getVariant: async (productId: string, variantId: string): Promise<Variant> => {
    try {
      const response = await api.get(
        `/variants/${productId}/getVariant/${variantId}`
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching variant:', error);
      throw error;
    }
  },

  // Update a variant
  updateVariant: async (
    productId: string,
    variantId: string,
    variantData: Partial<Variant>
  ): Promise<Variant> => {
    try {
      const response = await api.put(
        `/variants/${productId}/updateVariant/${variantId}`,
        variantData
      );
      return response.data;
    } catch (error) {
      console.error('Error updating variant:', error);
      throw error;
    }
  },

  // Delete a variant
  deleteVariant: async (productId: string, variantId: string): Promise<void> => {
    try {
      await api.delete(
        `/variants/${productId}/deleteVariant/${variantId}`
      );
    } catch (error) {
      console.error('Error deleting variant:', error);
      throw error;
    }
  }
};

export default variantApi;