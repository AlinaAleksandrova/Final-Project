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
            console.log("Fetching product by ID:", id);
            dispatch(fetchProductById(id));
        }
    }, [dispatch, id]);

    useEffect(() => {
        console.log("Product:", product);
    }, [product]);


    if (status === 'loading') {
        return <div>Loading product...</div>;
    }


    if (status === 'failed') {
        return <div>Error loading product: {error}</div>;
    }


    if (!product) {
        return <div>Product not found</div>;
    }


    const handleAddToCart = () => {
        if (product && quantity > 0) {
            const productWithQuantity = { ...product, quantity };
            console.log("Attempting to add to cart:", productWithQuantity);
            dispatch(addToCart(productWithQuantity));
        }
    };


    if (!product.title || !product.image || !product.price || !product.description) {
        return <div>Some product data is missing</div>;
    }
/*    const relatedProducts = products.filter(
        (relatedProduct) =>
            relatedProduct.category === product.category && relatedProduct.id !== product.id
    );*/

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
            </div>*/}
        </div>
    );
};

export default ProductPage;
