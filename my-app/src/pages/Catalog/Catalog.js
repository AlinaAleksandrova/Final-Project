import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../features/products/productsSlice';
import ProductCard from '../../components/Catalog/ProductCard';
import Filters from '../../components/Catalog/Filters';
import Pagination from '../../components/Catalog/Pagination';
import '../../styles/pages/Catalog.css';

const Catalog = () => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products.filteredItems);
    const status = useSelector((state) => state.products.status);
    const error = useSelector((state) => state.products.error);
    const currentPage = useSelector((state) => state.products.currentPage);
    const itemsPerPage = 10;

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchProducts());
        }
    }, [status, dispatch]);

    const indexOfLastProduct = currentPage * itemsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    return (
        <div className="catalog">
            <Filters />
            <div className="products-list row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                {status === 'loading' ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p>Error: {error}</p>
                ) : (
                    currentProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))
                )}
            </div>
            <Pagination totalItems={products.length} itemsPerPage={itemsPerPage} />
        </div>
    );
};

export default Catalog;



