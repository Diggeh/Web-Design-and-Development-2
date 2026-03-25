import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { productService } from "../services/productService";
import { useCart } from "../contexts/CartContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Toast from "../components/Toast";
import { FiArrowLeft, FiShoppingCart, FiMinus, FiPlus } from "react-icons/fi";
import "../styles/ProductDetail.css";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await productService.getById(id);
        setProduct(data);
      } catch (error) {
        setToast({ message: error.message, type: "error" });
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    setToast({ message: `Added ${quantity} item(s) to cart!`, type: "success" });
  };

  if (loading) {
    return (
      <div className="detail-page">
        <Header />
        <div className="detail-container">
          <div className="detail-skeleton">
            <div className="skeleton-img-lg" />
            <div className="skeleton-info-lg">
              <div className="skeleton-line wide" />
              <div className="skeleton-line" />
              <div className="skeleton-line short" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="detail-page">
        <Header />
        <div className="detail-container">
          <div className="empty-state">
            <span className="empty-icon">😕</span>
            <h3>Product not found</h3>
            <Link to="/" className="back-home-link">← Back to Shop</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="detail-page">
      <Header />
      <div className="detail-container">
        <button className="back-btn" onClick={() => navigate(-1)} id="back-btn">
          <FiArrowLeft /> Back
        </button>

        <div className="detail-content">
          <div className="detail-image-wrapper">
            {product.image ? (
              <img src={product.image} alt={product.name} className="detail-image" />
            ) : (
              <div className="detail-placeholder">📦</div>
            )}
          </div>

          <div className="detail-info">
            <span className="detail-category">{product.category}</span>
            <h1 className="detail-name">{product.name}</h1>
            <p className="detail-price">₱{product.price.toFixed(2)}</p>
            <p className="detail-description">{product.description}</p>

            <div className="detail-actions">
              <div className="quantity-control">
                <button
                  className="qty-btn"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  id="qty-minus"
                >
                  <FiMinus />
                </button>
                <span className="qty-value">{quantity}</span>
                <button
                  className="qty-btn"
                  onClick={() => setQuantity(quantity + 1)}
                  id="qty-plus"
                >
                  <FiPlus />
                </button>
              </div>
              <button className="add-to-cart-btn" onClick={handleAddToCart} id="add-to-cart-detail">
                <FiShoppingCart />
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />

      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
      )}
    </div>
  );
}
