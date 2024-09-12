import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import logo from '../../images/logo.webp';
import '../../styles/components/Header.css';

const Header = () => {
    const totalItems = useSelector((state) => state.cart?.totalItems ?? 0);

    return (
        <header className="header">
            <div className="header-logo">
                <Link to="/">
                    <img src={logo} alt="My Store Logo" className="logo"/>
                </Link>
                <h1 className="store-name">ShopEase</h1>
            </div>

            <nav className="header-menu">
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/product">Shop</Link></li>
                    <li><Link to="/about">About Us</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                </ul>
            </nav>

            <div className="header-cart">
                <Link to="/cart" className="cart-link">
                    <ShoppingCartIcon className="cart-icon" />
                    <span className="cart-text">Cart ({totalItems})</span>
                </Link>
            </div>
        </header>
    );
};

export default Header;


