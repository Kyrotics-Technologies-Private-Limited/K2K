export interface Product {
    id: string;
    name: string;
    price: {
      amount: number;
      currency: "INR";
      variants: {
        weight: string;
        price: number;
        inStock: boolean;
      }[];
    };
    description: string;
    ingredients: string[];
    origin: string;
    category: "ghee" | "oils" | "honey";
    images: {
      main: string;
      gallery: string[];
      thumbnail: string;
    };
    stockStatus: "in_stock" | "low_stock" | "out_of_stock";
    ratings: number;
    reviews: number;
  }
  
  export type SortOption = "price_high" | "price_low" | "popularity" | "newest";
  
  export interface CartItem extends Product {
    quantity: number;
    selectedVariant: number;
  }
  
  export interface FilterState {
    category: string[];
    priceRange: [number, number];
    availability: ("in_stock" | "low_stock")[];
    searchQuery: string;
    sortBy: SortOption;
  }