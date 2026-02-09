import api from "../api/api";

export interface Review {
  id: string;
  rating: number;
  comment: string;
  productId: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export const reviewApi = {
  getProductReviews: async (productId: string): Promise<Review[]> => {
    const response = await api.get<Review[]>(`/reviews/product/${productId}`);
    return response.data;
  },

  createReview: async (data: {
    productId: string;
    rating: number;
    comment: string;
  }): Promise<Review> => {
    const response = await api.post<Review & { id: string }>("/reviews/create", data);
    return response.data as Review;
  },

  updateReview: async (
    id: string,
    data: { rating?: number; comment?: string }
  ): Promise<Review> => {
    const response = await api.put<Review>(`/reviews/${id}`, data);
    return response.data;
  },

  deleteReview: async (id: string): Promise<{ message: string }> => {
    const response = await api.delete<{ message: string }>(`/reviews/${id}`);
    return response.data;
  },

  getMyReviews: async (): Promise<Review[]> => {
    const response = await api.get<Review[]>("/reviews/my");
    return response.data;
  },
};
