import React, { useState, useEffect } from 'react';
import '../../styles/pages/CheckoutPage.css';

const CheckoutPage = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        address: '',
        city: '',
        state: '',
        zip: '',
        deliveryMethod: 'usps',
        paymentMethod: 'creditcard',
        cardNumber: '',
        cardExpiry: '',
        cardCVV: ''
    });
    const [orderSuccess, setOrderSuccess] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.paymentMethod === 'paypal') {
            return;
        }

        console.log("Processing credit card payment", formData);

        setOrderSuccess(true);
    };

    const renderPayPalButton = () => {
        window.paypal.Buttons({
            createOrder: (data, actions) => {
                return actions.order.create({
                    purchase_units: [{
                        amount: {
                            value: '100.00'
                        }
                    }]
                });
            },
            onApprove: (data, actions) => {
                return actions.order.capture().then((details) => {
                    console.log('Transaction completed by', details.payer.name.given_name);
                    setOrderSuccess(true);
                });
            },
            onError: (err) => {
                console.error('PayPal Checkout Error:', err);
            }
        }).render('#paypal-button-container');
    };

    useEffect(() => {
        if (formData.paymentMethod === 'paypal') {
            renderPayPalButton();
        }
    }, [formData.paymentMethod]);

    if (orderSuccess) {
        return <div>Thank you! Your order has been successfully placed.</div>;
    }

    return (
        <div className="checkout-page">
            <h1>Checkout</h1>
            <form onSubmit={handleSubmit}>
                <h3>Personal Information</h3>
                <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                />
                <input
                    type="tel"
                    name="phone"
                    placeholder="Phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />

                <h3>Shipping Address</h3>
                <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="state"
                    placeholder="State"
                    value={formData.state}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="zip"
                    placeholder="Zip Code"
                    value={formData.zip}
                    onChange={handleChange}
                    required
                />

                <h3>Delivery Method</h3>
                <select name="deliveryMethod" value={formData.deliveryMethod} onChange={handleChange}>
                    <option value="usps">USPS (United States Postal Service)</option>
                    <option value="fedex">FedEx</option>
                    <option value="ups">UPS</option>
                </select>

                <h3>Payment Method</h3>
                <select name="paymentMethod" value={formData.paymentMethod} onChange={handleChange}>
                    <option value="creditcard">Credit Card</option>
                    <option value="paypal">PayPal</option>
                </select>

                {formData.paymentMethod === 'creditcard' && (
                    <div>
                        <h3>Credit Card Information</h3>
                        <input
                            type="text"
                            name="cardNumber"
                            placeholder="Card Number"
                            value={formData.cardNumber}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="text"
                            name="cardExpiry"
                            placeholder="Expiry Date (MM/YY)"
                            value={formData.cardExpiry}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="text"
                            name="cardCVV"
                            placeholder="CVV"
                            value={formData.cardCVV}
                            onChange={handleChange}
                            required
                        />
                    </div>
                )}

                {formData.paymentMethod === 'paypal' && (
                    <div id="paypal-button-container"></div>
                )}

                <button type="submit">Place Order</button>
            </form>
        </div>
    );
};

export default CheckoutPage;
