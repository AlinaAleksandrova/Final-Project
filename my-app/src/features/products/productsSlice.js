import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
    const response = await axios.get('https://fakestoreapi.com/products');
    console.log('Fetched products:', response.data); // Додаємо лог для перевірки
    return response.data;
});



const initialState = {
    items: [],
    categories: [],
    status: 'idle',
    error: null,
};

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;


                const uniqueCategories = new Set(action.payload.map((product) => product.category));
                state.categories = Array.from(uniqueCategories);
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default productsSlice.reducer;
