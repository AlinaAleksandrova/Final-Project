import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateCartQuantity, removeFromCart } from '../../features/cart/cartSlice';
import '../../styles/pages/CartPage.css';

const CartPage = () => {
    const cartItems = useSelector((state) => state.cart.items);

    const dispatch = useDispatch();
    console.log("Cart Items in CartPage:", cartItems);
    const handleQuantityChange = (id, quantity) => {
        dispatch(updateCartQuantity({ id, quantity }));
    };

    const handleRemoveFromCart = (id) => {
        dispatch(removeFromCart(id));
    };

    if (cartItems.length === 0) {
        return <div>Your cart is empty</div>;
    }

    return (
        <div className="cart-page">
            <h1>Your Cart</h1>
            <ul>
                {cartItems.map((item) => (
                    <li key={item.id}>
                        <img src={item.image} alt={item.title} />
                        <div>
                            <h3>{item.title}</h3>
                            <p>Price: {item.price}</p>
                            <input
                                type="number"
                                value={item.quantity}
                                min="1"
                                onChange={(e) => handleQuantityChange(item.id, Number(e.target.value))}
                            />
                            <button onClick={() => handleRemoveFromCart(item.id)}>Remove</button>
                        </div>
                    </li>
                ))}
            </ul>
            <h2>Total: {cartItems.reduce((total, item) => total + item.price * item.quantity, 0)} $</h2>
        </div>
    );
};

export default CartPage;