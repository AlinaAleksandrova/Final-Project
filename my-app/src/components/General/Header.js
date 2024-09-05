import React from 'react';
import { useSelector } from 'react-redux';

const Header = () => {
    const totalItems = useSelector((state) => state.cart?.totalItems ?? 0);

    return (
        <header>
            <h1>My Store</h1>
            <div>Items in Cart: {totalItems}</div>
        </header>
    );
};

export default Header;

