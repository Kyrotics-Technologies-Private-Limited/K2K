export interface Address {
    id: string; // Now required for uniqueness
    userId?: string;
    name: string;
    phone: string;
    appartment: string;
    adress: string;
    state: string;
    country: string;
    pincode: string;
    isDefault?: boolean;
    createdAt?: string;
  }
