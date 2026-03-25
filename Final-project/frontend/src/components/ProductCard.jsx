import { Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import "../styles/ProductCard.css";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <Link to={`/product/${product._id}`} className="product-card" id={`product-${product._id}`}>
      <div className="product-card-image">
        {product.image ? (
          <img src={product.image} alt={product.name} loading="lazy" />
        ) : (
          <div className="product-card-placeholder">
            <span>📦</span>
          </div>
        )}
        <span className="product-card-category">{product.category}</span>
      </div>
      <div className="product-card-body">
        <h3 className="product-card-name">{product.name}</h3>
        <p className="product-card-desc">
          {product.description && product.description.length > 80
            ? product.description.substring(0, 80) + "..."
            : product.description}
        </p>
        <div className="product-card-footer">
          <span className="product-card-price">
            ₱{product.price.toFixed(2)}
          </span>
          <button
            className="product-card-btn"
            onClick={handleAddToCart}
            id={`add-to-cart-${product._id}`}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
