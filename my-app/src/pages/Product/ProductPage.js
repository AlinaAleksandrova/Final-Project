import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProductById, fetchProducts } from '../../features/products/productsSlice';
import { addToCart } from '../../features/cart/cartSlice';
import ProductCard from '../../components/Catalog/ProductCard';
import '../../styles/pages/ProductPage.css';

const ProductPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();

    const product = useSelector((state) => state.products.currentProduct);
    const status = useSelector((state) => state.products.status);
    const products = useSelector((state) => state.products.items);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        dispatch(fetchProductById(id));
        dispatch(fetchProducts());
    }, [dispatch, id]);


    const handleAddToCart = () => {
        dispatch(addToCart({ ...product, quantity }));
    };

    if (status === 'loading') {
        return <div>Loading product...</div>;
    }

    if (!product) {
        return <div>Product not found</div>;
    }

    const relatedProducts = products.filter(
        (relatedProduct) =>
            relatedProduct.category === product.category && relatedProduct.id !== product.id
    );

    return (
        <div className="product-page">
            <img src={product.image} alt={product.name} />
            <h1>{product.name}</h1>
            <p>{product.price} $</p>
            <p>{product.description}</p>

            <div className="quantity-selector">
                <label htmlFor="quantity">Quantity:</label>
                <input
                    type="number"
                    id="quantity"
                    value={quantity}
                    min="1"
                    onChange={(e) => setQuantity(Number(e.target.value))}
                />
            </div>


            <button onClick={handleAddToCart}>Add to Cart</button>

            <div className="related-products">
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
            </div>
        </div>
    );
};

export default ProductPage;
