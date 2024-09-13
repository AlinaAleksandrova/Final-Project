import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
    return (
        <div className="product-card">
            <Link to={`/product/${product.id}`}>
                <img src={product.image} alt={product.name} />
            </Link>
            <h3>{product.name}</h3>
            <p>{product.price} $</p>
            <button>Add to Cart</button>
        </div>
    );
};

ProductCard.propTypes = {
    product: PropTypes.object.isRequired,
};

export default ProductCard;
