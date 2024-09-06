import React from 'react';

const CheckoutPage = () => {
    return (
        <div className="checkout-page">
            <h1>Checkout</h1>
            <form>
                <div className="form-group">
                    <label htmlFor="name">Full Name:</label>
                    <input type="text" id="name" name="name" required />
                </div>
                <div className="form-group">
                    <label htmlFor="address">Address:</label>
                    <input type="text" id="address" name="address" required />
                </div>
                <div className="form-group">
                    <label htmlFor="payment">Payment Method:</label>
                    <select id="payment" name="payment">
                        <option value="creditCard">Credit Card</option>
                        <option value="paypal">PayPal</option>
                    </select>
                </div>
                <button type="submit">Submit Order</button>
            </form>
        </div>
    );
};

export default CheckoutPage;
