import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../features/products/productsSlice';
import ProductCard from '../../components/Catalog/ProductCard';
import Filters from '../../components/Catalog/Filters';
import Pagination from '../../components/Catalog/Pagination';
import '../../styles/pages/Catalog.css';
import 'bootstrap/dist/css/bootstrap.min.css';

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
        <div className="container catalog mt-5">
            <div className="row">
                <div className="col-lg-3 col-md-4 mb-4">
                    <Filters />
                </div>
                <div className="col-lg-9 col-md-8">
                    <div className="products-list">
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

                    <div className="d-flex justify-content-center mt-4">
                        <Pagination totalItems={products.length} itemsPerPage={itemsPerPage} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Catalog;
