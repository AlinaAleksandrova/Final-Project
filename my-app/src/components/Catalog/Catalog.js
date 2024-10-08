import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../../features/products/productsSlice';
import ProductCard from '../../components/Catalog/ProductCard';
import '../../styles/pages/Catalog.css';

const Catalog = () => {
    const dispatch = useDispatch();

    const products = useSelector((state) => state.products.items);
    const status = useSelector((state) => state.products.status);
    const error = useSelector((state) => state.products.error);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchProducts());
        }
    }, [status, dispatch]);

    if (status === 'loading') {
        return <div>Loading...</div>;
    }

    if (status === 'failed') {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="catalog row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
};

export default Catalog;
