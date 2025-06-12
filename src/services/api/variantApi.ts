import api from './api';
import { Variant } from './../../types/variant';

// Fetch all variants
export const getVariants = async (productId:string): Promise<Variant[]> => {
  try {
    const response = await api.get(`/variants/${productId}/getVariants`);
    return response.data;
  } catch (error) {
    console.error(error); // Log the error for easier debugging
    throw new Error('Error fetching variants');
  }
};

// Fetch a single variant by ID
export const getVariantById = async (productId: string, variantId: string): Promise<Variant> => {
  try {
    const response = await api.get(`/variants/${productId}/getVariant/${variantId}`);
    return response.data;
  } catch (error) {
    console.error(error); // Log the error for easier debugging
    throw new Error(`Error fetching variant with id ${variantId}`);
  }
};

// Create a new variant
export const createVariant = async (productId: string, variant: Variant): Promise<Variant> => {
  try {
    const response = await api.post(`/variants/${productId}/createVariant`, variant);
    return response.data;
  } catch (error) {
    console.error(error); // Log the error for easier debugging
    throw new Error('Error creating variant');
  }
};

// Update an existing variant
export const updateVariant = async (productId: string, variantId: string) => {
  try {
    const res = await api.put(`/api/variants/${productId}/updateVariant/${variantId}`);
    return res.data;
  } catch (error) {
    console.error('Update error:', error);
    throw new Error(`Error updating variant with id ${variantId}`);
  }
};



// Delete a variant
export const deleteVariant = async (
  productId: string,
  variantId: string
): Promise<void> => {
  try {
    await api.delete(`/variants/${productId}/deleteVariant/${variantId}`);
  } catch (error) {
    console.error(error); // Log the error for easier debugging
    throw new Error(`Error deleting variant with id ${variantId}`);
  }
};


// Example of a function to get all variants for a specific product
export const getVariantsByProductId = async (productId: string): Promise<Variant[]> => {
  try {
    const response = await api.get(`/variants/${productId}/getVariants`, {
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
      validateStatus: (status) => status < 500
    });

    if (response.status === 404) {
      return [];
    }

    if (response.status !== 200) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    if (!Array.isArray(response.data)) {
      throw new Error('Invalid response format - expected array');
    }

    return response.data;
  } catch (error) {
    console.error('Error fetching variants:', error);
    return [];
  }
};

// Export all functions as a single object
const variantApi = {
  getVariants,
  getVariantById,
  createVariant,
  updateVariant,
  deleteVariant,
  getVariantsByProductId,
};

export default variantApi;

