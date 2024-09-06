import { configureStore } from '@reduxjs/toolkit';
import { productApi } from '../api/productApi';
import cartReducer from '../features/cart/cartSlice';
import productsReducer from '../features/products/productsSlice';

export default configureStore({
    reducer: {
        cart: cartReducer,
        [productApi.reducerPath]: productApi.reducer,
        products: productsReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(productApi.middleware),
});

