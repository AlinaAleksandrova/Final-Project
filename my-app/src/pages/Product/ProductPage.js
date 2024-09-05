import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProductById } from '../../features/products/productsSlice';

const ProductPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();

    const product = useSelector((state) => state.products.currentProduct);
    const status = useSelector((state) => state.products.status);

    useEffect(() => {
        dispatch(fetchProductById(id));
    }, [dispatch, id]);

    if (status === 'loading') {
        return <div>Loading product...</div>;
    }

    if (!product) {
        return <div>Product not found</div>;
    }

    return (
        <div className="product-page">
            <img src={product.image} alt={product.name} />
            <h1>{product.name}</h1>
            <p>{product.price} $</p>
            <p>{product.description}</p>
        </div>
    );
};

export default ProductPage;
