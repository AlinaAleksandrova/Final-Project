import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
    const response = await axios.get('https://fakestoreapi.com/products');
    return response.data;
});
export const fetchProductById = createAsyncThunk('products/fetchProductById', async (id) => {
    const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
    console.log("API response for product:", response.data);
    return response.data;
});



const productsSlice = createSlice({
    name: 'products',
    initialState: {
        items: [],
        filteredItems: [],
        currentProduct: null,
        status: 'idle',
        error: null,
        currentPage: 1,
    },
    reducers: {
        filterByCategory: (state, action) => {
            state.filteredItems = state.items.filter(
                (product) => product.category === action.payload || action.payload === ''
            );
        },
        filterByPrice: (state, action) => {
            const [minPrice, maxPrice] = action.payload;
            state.filteredItems = state.items.filter(
                (product) => product.price >= minPrice && product.price <= maxPrice
            );
        },
        searchProducts: (state, action) => {
            state.filteredItems = state.items.filter((product) =>
                product.title.toLowerCase().includes(action.payload.toLowerCase())
            );
        },
        setPage: (state, action) => {
            state.currentPage = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
                state.filteredItems = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });


        builder
            .addCase(fetchProductById.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProductById.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.currentProduct = action.payload;
                console.log("Product fetched successfully:", action.payload);
            })
            .addCase(fetchProductById.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
                console.error("Failed to fetch product:", action.error.message);
                state.currentProduct = null;
            });
    },
});

export const { filterByCategory, filterByPrice, searchProducts, setPage } = productsSlice.actions;
export default productsSlice.reducer;

