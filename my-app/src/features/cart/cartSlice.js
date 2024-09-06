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
                const newItem = { ...action.payload, quantity: action.payload.quantity || 1 };
                state.items = [...state.items, newItem]; // Додаємо товар до масиву
            }

            console.log("Cart items after adding:", JSON.parse(JSON.stringify(state.items)));
        },
        updateCartQuantity: (state, action) => {
            const item = state.items.find((item) => item.id === action.payload.id);
            if (item) {
                item.quantity = action.payload.quantity;
            }
        },
        removeFromCart: (state, action) => {
            state.items = state.items.filter((item) => item.id !== action.payload);
        },
    },
});

export const { addToCart, updateCartQuantity, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
