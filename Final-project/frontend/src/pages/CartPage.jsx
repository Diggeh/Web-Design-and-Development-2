import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { FiTrash2, FiMinus, FiPlus, FiShoppingBag } from "react-icons/fi";
import "../styles/CartPage.css";

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, cartTotal } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    navigate("/checkout");
  };

  return (
    <div className="cart-page">
      <Header />
      <div className="cart-container">
        <h1 className="cart-title">
          <FiShoppingBag className="cart-title-icon" />
          Shopping Cart
        </h1>

        {items.length === 0 ? (
          <div className="cart-empty">
            <span className="cart-empty-icon">🛒</span>
            <h3>Your cart is empty</h3>
            <p>Looks like you haven't added any products yet.</p>
            <Link to="/" className="continue-shopping" id="continue-shopping">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="cart-layout">
            <div className="cart-items">
              {items.map((item) => (
                <div key={item._id} className="cart-item" id={`cart-item-${item._id}`}>
                  <div className="cart-item-image">
                    {item.image ? (
                      <img src={item.image} alt={item.name} />
                    ) : (
                      <div className="cart-item-placeholder">📦</div>
                    )}
                  </div>
                  <div className="cart-item-details">
                    <Link to={`/product/${item._id}`} className="cart-item-name">
                      {item.name}
                    </Link>
                    <span className="cart-item-price">
                      ₱{item.price.toFixed(2)}
                    </span>
                  </div>
                  <div className="cart-item-actions">
                    <div className="cart-qty-control">
                      <button
                        className="cart-qty-btn"
                        onClick={() => updateQuantity(item._id, item.quantity - 1)}
                      >
                        <FiMinus />
                      </button>
                      <span className="cart-qty-value">{item.quantity}</span>
                      <button
                        className="cart-qty-btn"
                        onClick={() => updateQuantity(item._id, item.quantity + 1)}
                      >
                        <FiPlus />
                      </button>
                    </div>
                    <span className="cart-item-subtotal">
                      ₱{(item.price * item.quantity).toFixed(2)}
                    </span>
                    <button
                      className="cart-remove-btn"
                      onClick={() => removeFromCart(item._id)}
                      id={`remove-${item._id}`}
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <h3 className="summary-title">Order Summary</h3>
              <div className="summary-row">
                <span>Subtotal ({items.length} items)</span>
                <span>₱{cartTotal.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Shipping</span>
                <span className="free-shipping">Free</span>
              </div>
              <div className="summary-divider" />
              <div className="summary-row total">
                <span>Total</span>
                <span>₱{cartTotal.toFixed(2)}</span>
              </div>
              <button
                className="checkout-btn"
                onClick={handleCheckout}
                id="checkout-btn"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
