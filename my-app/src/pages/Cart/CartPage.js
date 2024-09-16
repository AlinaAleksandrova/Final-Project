import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateCartQuantity, removeFromCart } from '../../features/cart/cartSlice';
import '../../styles/pages/CartPage.css';

const CartPage = () => {
    const cartItems = useSelector((state) => state.cart.items);

    const dispatch = useDispatch();
    console.log("Cart Items in CartPage:", cartItems);

    const handleQuantityChange = (id, quantity) => {
        if (quantity > 0) {
            dispatch(updateCartQuantity({ id, quantity }));
        }
    };

    const handleRemoveFromCart = (id) => {
        dispatch(removeFromCart(id));
    };

    if (!cartItems || cartItems.length === 0) {
        return <div>Your cart is empty</div>;
    }

    return (
        <div className="cart-page container mt-5">
            <h1 className="mb-4">Your Cart</h1>
            <ul className="list-unstyled">
                {cartItems.map((item) => (
                    <li key={item.id} className="d-flex align-items-center mb-4">
                        <img
                            src={item.image}
                            alt={item.title}
                            className="img-fluid rounded me-3"
                            style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                        />
                        <div>
                            <h3>{item.title}</h3>
                            <p>Price: ${item.price}</p>
                            <input
                                type="number"
                                value={item.quantity}
                                min="1"
                                onChange={(e) => handleQuantityChange(item.id, Number(e.target.value))}
                                className="form-control w-25 d-inline-block"
                            />
                            <button
                                className="btn btn-danger ms-3"
                                onClick={() => handleRemoveFromCart(item.id)}
                            >
                                Remove
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
            <h2>Total: ${cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}</h2>
        </div>
    );
};

export default CartPage;
