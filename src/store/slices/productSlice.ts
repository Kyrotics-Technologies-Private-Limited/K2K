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
    async (_, { rejectWithValue }) => {
        try {
            const products = await productApi.getAllProducts();
            return products;
        } catch (err: any) {
            const message = err?.response?.data?.error ?? err?.message ?? 'Failed to fetch products';
            return rejectWithValue(message);
        }
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
                const list = Array.isArray(action.payload) ? action.payload : [];
                state.products = list;
                const uniqueCategories = Array.from(
                    new Set(
                        list
                            .map((product) => product.category?.toLowerCase())
                            .filter((category): category is string => !!category && category.trim().length > 0)
                    )
                ).sort();
                state.categories = uniqueCategories;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = (action.payload as string) || action.error?.message || 'Failed to fetch products';
            });
    },
});

export default productSlice.reducer;
