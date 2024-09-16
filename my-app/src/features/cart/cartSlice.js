import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
    },
    reducers: {
        addToCart: (state, action) => {
            const existingItem = state.items.find((item) => item.id === action.payload.id);

            if (existingItem) {
                existingItem.quantity += action.payload.quantity;
            } else {
                state.items.push({
                    id: action.payload.id,
                    title: action.payload.title,
                    price: action.payload.price,
                    image: action.payload.image,
                    quantity: action.payload.quantity
                });
            }
            state.totalItems = state.items.reduce((total, item) => total + item.quantity, 0);
            console.log("Cart items after adding:", JSON.parse(JSON.stringify(state.items)));
        },
        updateCartQuantity: (state, action) => {
            const item = state.items.find((item) => item.id === action.payload.id);
            if (item) {
                item.quantity = action.payload.quantity;
            }
        },
        removeFromCart: (state, action) => {
            state.items = state.items.filter(item => item.id !== action.payload);
            state.totalItems = state.items.reduce((total, item) => total + item.quantity, 0);
        },
    },
});

export const { addToCart, updateCartQuantity, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
