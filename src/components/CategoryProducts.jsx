import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const CategoryProducts = () => {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        // За умови, що API підтримує фільтрацію через query-параметр categoryId
        const response = await fetch(`https://api.escuelajs.co/api/v1/products?categoryId=${id}`);
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        console.error('Помилка при отриманні товарів категорії:', err);
        setError('Не вдалося завантажити товари категорії.');
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryProducts();
  }, [id]);

  if (loading) return <p>Завантаження товарів...</p>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="container mt-4">
      <h2>Товари категорії</h2>
      <div className="row">
        {products.map((product) => (
          <div key={product.id} className="col-md-4 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{product.title}</h5>
                <p className="card-text">{product.description}</p>
                {/* За потреби можна додати кнопку чи інші деталі */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryProducts;
