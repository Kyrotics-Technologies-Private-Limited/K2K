import api from './api';

export const invoiceApi = {
  // Save invoice to Firebase Storage
  saveInvoice: async (orderId: string, pdfBlob: Blob): Promise<{ url: string }> => {
    const formData = new FormData();
    formData.append('invoice', pdfBlob, 'invoice.pdf');

    const response = await api.post<{ url: string }>(
      `/invoice/${orderId}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data;
  },

  // Get invoice URL for an order
  getInvoiceUrl: async (orderId: string): Promise<{ url: string }> => {
    const response = await api.get<{ url: string }>(`/invoice/${orderId}`);
    return response.data;
  },

  // Get all invoices for current user
  getUserInvoices: async () => {
    const response = await api.get('/invoice/user/all');
    return response.data;
  },
};
