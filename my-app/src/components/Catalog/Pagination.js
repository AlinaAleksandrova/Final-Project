import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPage } from '../../features/products/productsSlice';

const Pagination = ({ totalItems, itemsPerPage }) => {
    const dispatch = useDispatch();
    const currentPage = useSelector((state) => state.products.currentPage);
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const handleClick = (page) => {
        dispatch(setPage(page));
    };

    return (
        <div className="pagination">
            {[...Array(totalPages).keys()].map((page) => (
                <button
                    key={page}
                    className={page + 1 === currentPage ? 'active' : ''}
                    onClick={() => handleClick(page + 1)}
                >
                    {page + 1}
                </button>
            ))}
        </div>
    );
};

export default Pagination;
