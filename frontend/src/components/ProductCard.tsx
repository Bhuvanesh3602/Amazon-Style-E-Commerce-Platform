import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  stock?: number;
  sold?: number;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const handleViewDetails = () => {
    navigate(`/product/${product._id}`);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (product.stock && product.stock > 0) {
      addToCart(product);
    } else {
      alert('Product out of stock!');
    }
  };

  return (
    <div className="product-card" onClick={handleViewDetails}>
      <img
        src={`http://localhost:5001${product.image}`}
        alt={product.name}
        className="product-image"
      />
      <div className="product-info">
        <h3 className="product-title">{product.name}</h3>
        <p className="product-category">{product.category}</p>
        <p className="product-price">${product.price}</p>
        <p className="product-stock">Stock: {product.stock || 0}</p>
        <p className="product-sold">Sold: {product.sold || 0}</p>
        <div className="product-actions">
          <button onClick={handleAddToCart} className="add-to-cart-btn" disabled={!product.stock || product.stock === 0}>
            {product.stock && product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;