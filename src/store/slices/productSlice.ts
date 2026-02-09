import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../types';
import { productApi } from '../../services/api/productApi';

interface ProductState {
    products: Product[];
    categories: string[];
    loading: boolean;
    error: string | null;
}

const initialState: ProductState = {
    products: [],
    categories: [],
    loading: false,
    error: null,
};

export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async () => {
        const products = await productApi.getAllProducts();
        return products;
    }
);

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
                state.loading = false;
                state.products = action.payload;
                // Extract unique categories, filter empty/null, and sort alphabetically
                const uniqueCategories = Array.from(
                    new Set(
                        action.payload
                            .map((product) => product.category?.toLowerCase())
                            .filter((category): category is string => !!category && category.trim().length > 0)
                    )
                ).sort();
                state.categories = uniqueCategories;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch products';
            });
    },
});

export default productSlice.reducer;
