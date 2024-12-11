import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { deleteProduct } from '../services/productService'; 

const initialState = {
    products: [],
    loading: false,
    error: null,
};

// Async Thunk untuk Delete Product
export const deleteProductAsync = createAsyncThunk(
    'product/deleteProductAsync',
    async (id, { rejectWithValue }) => {
        try {
            // Panggil deleteProduct dari productService
            await deleteProduct(id);
            return id; // Mengembalikan ID produk yang dihapus
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setProducts(state, action) {
            state.products = action.payload;
        },
        addProduct(state, action) {
            state.products.push(action.payload);
        },
        updateProduct(state, action) {
            const index = state.products.findIndex(
                (product) => product.id === action.payload.id
            );
            if (index !== -1) {
                state.products[index] = action.payload;
            }
        },
        setLoading(state, action) {
            state.loading = action.payload;
        },
        setError(state, action) {
            state.error = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(deleteProductAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteProductAsync.fulfilled, (state, action) => {
                state.loading = false;
                // Hapus produk dari state setelah berhasil dihapus di server
                state.products = state.products.filter(
                    (product) => product.id !== action.payload
                );
            })
            .addCase(deleteProductAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const {
    setProducts,
    addProduct,
    updateProduct,
    setLoading,
    setError,
} = productSlice.actions;

export default productSlice.reducer;