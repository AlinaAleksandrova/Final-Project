import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/General/Header';
import Footer from './components/General/Footer';
import Catalog from './pages/Catalog/Catalog';
import ProductPage from './pages/Product/ProductPage';
import CartPage from './pages/Cart/CartPage';
import CheckoutPage from './pages/Checkout/CheckoutPage';

function App() {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<Catalog />} />
                {<Route path="/product/:id" element={<ProductPage />} />}
                {<Route path="/cart" element={<CartPage />} />}
                {<Route path="/checkout" element={<CheckoutPage />} />}
            </Routes>
            <Footer />
        </Router>
    );
}

export default App;


