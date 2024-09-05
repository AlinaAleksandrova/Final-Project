import React from 'react';
import PropTypes from 'prop-types';

const ProductCard = ({ product }) => {
    return (
        <div className="product-card col">
            <img src={product.image} alt={product.name} />
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
