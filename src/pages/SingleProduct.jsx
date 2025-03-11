// Then update SingleProduct.jsx to fetch and display a single product:
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBasketShopping } from '@fortawesome/free-solid-svg-icons';

function SingleProduct({ selectProd }) {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        fetch(`https://api.escuelajs.co/api/v1/products/${id}`)
            .then(resp => resp.json())
            .then(data => {
                setProduct(data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching product:', err);
                setLoading(false);
            });
    }, [id]);
    
    if (loading) {
        return <p>Loading product...</p>;
    }
    
    if (!product) {
        return <p>Product not found</p>;
    }
    
    return (
        <div className="container mt-4">
            <div className="card">
                <div className="row g-0">
                    <div className="col-md-4">
                        {product.category && product.category.image && (
                            <img 
                                src={product.category.image} 
                                className="img-fluid rounded-start" 
                                alt={product.title} 
                                style={{height: '100%', objectFit: 'cover'}}
                            />
                        )}
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h2 className="card-title">{product.title}</h2>
                            <h4 className="card-text text-primary">{product.price} $</h4>
                            <p className="card-text">{product.description}</p>
                            <button 
                                className="btn" 
                                onClick={() => selectProd(product)}
                            >
                                <FontAwesomeIcon icon={faBasketShopping} className='icon'/> Add to basket
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SingleProduct;