import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProductById } from '../../features/products/productsSlice';
import { addToCart } from '../../features/cart/cartSlice';
import '../../styles/pages/ProductPage.css';

const ProductPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();

    const product = useSelector((state) => state.products.currentProduct);
    const status = useSelector((state) => state.products.status);
    const error = useSelector((state) => state.products.error);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        if (id) {
            console.log('Fetching product by ID:', id);
            dispatch(fetchProductById(id));
        }
    }, [dispatch, id]);

    useEffect(() => {
        console.log('Product:', product);
    }, [product]);

    if (status === 'loading') {
        return <div className="text-center mt-5">Loading product...</div>;
    }

    if (status === 'failed') {
        return <div className="text-danger">Error loading product: {error}</div>;
    }

    if (!product) {
        return <div className="text-warning">Product not found</div>;
    }

    const handleAddToCart = () => {
        if (quantity > 0) {
            console.log('Adding to cart:', { id: product.id, name: product.name, price: product.price, quantity });
            dispatch(addToCart({ id: product.id, title: product.name, price: product.price, quantity }));
        }
    };


    if (!product.title || !product.image || !product.price || !product.description) {
        return <div className="text-danger">Some product data is missing</div>;
    }
/*    const relatedProducts = products.filter(
        (relatedProduct) =>
            relatedProduct.category === product.category && relatedProduct.id !== product.id
    );*/

    return (
        <div className="container product-page mt-5 animate__animated animate__fadeIn">
            <div className="row">
                <div className="col-md-6">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="img-fluid rounded shadow-sm animate__animated animate__zoomIn"
                    />
                </div>
                <div className="col-md-6">
                    <h1 className="product-name display-4 mb-3">{product.name}</h1>
                    <p className="lead">{product.description}</p>
                    <h3 className="text-success mb-4">${product.price}</h3>

                    <div className="quantity-selector mb-4">
                        <label htmlFor="quantity" className="form-label">Quantity:</label>
                        <input
                            type="number"
                            id="quantity"
                            value={quantity}
                            min="1"
                            onChange={(e) => setQuantity(Number(e.target.value))}
                            className="form-control w-25"
                        />
                    </div>

                    <button
                        onClick={handleAddToCart}
                        className="btn btn-primary btn-lg d-flex align-items-center animate__animated animate__pulse"
                    >
                        <i className="bi bi-cart-plus me-2"></i>
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};
{/*<div className="related-products">
                <h2>Related Products</h2>
                <div className="products-list">
                    {relatedProducts.length > 0 ? (
                        relatedProducts.map((relatedProduct) => (
                            <ProductCard key={relatedProduct.id} product={relatedProduct} />
                        ))
                    ) : (
                        <p>No related products found.</p>
                    )}
                </div>
            </div>*/
}
export default ProductPage;
