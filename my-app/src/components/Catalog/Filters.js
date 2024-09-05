import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { filterByCategory, filterByPrice, searchProducts } from '../../features/products/productsSlice';

const Filters = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [category, setCategory] = useState('');
    const [priceRange, setPriceRange] = useState([0, 1000]);
    const dispatch = useDispatch();

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        dispatch(searchProducts(e.target.value));
    };

    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
        dispatch(filterByCategory(e.target.value));
    };

    const handlePriceChange = (range) => {
        setPriceRange(range);
        dispatch(filterByPrice(range));
    };

    return (
        <div className="filters">
            <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={handleSearch}
            />
            <select value={category} onChange={handleCategoryChange}>
                <option value="">All Categories</option>
                <option value="electronics">Electronics</option>
                <option value="fashion">Fashion</option>
                <option value="furniture">Furniture</option>
            </select>
            <div className="price-range">
                <label>Price Range: {priceRange[0]} - {priceRange[1]}</label>
                <input
                    type="range"
                    min="0"
                    max="1000"
                    value={priceRange[0]}
                    onChange={(e) => handlePriceChange([+e.target.value, priceRange[1]])}
                />
                <input
                    type="range"
                    min="0"
                    max="1000"
                    value={priceRange[1]}
                    onChange={(e) => handlePriceChange([priceRange[0], +e.target.value])}
                />
            </div>
        </div>
    );
};

export default Filters;
