import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";
import { orderService } from "../services/orderService";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Toast from "../components/Toast";
import { FiCheck } from "react-icons/fi";
import "../styles/Checkout.css";

export default function Checkout() {
  const { items, cartTotal, clearCart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [toast, setToast] = useState(null);

  if (!isAuthenticated) {
    navigate("/login");
    return null;
  }

  if (items.length === 0 && !orderPlaced) {
    navigate("/cart");
    return null;
  }

  const handlePlaceOrder = async () => {
    try {
      setLoading(true);
      const orderData = {
        items: items.map((item) => ({
          product: item._id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
        totalPrice: cartTotal,
      };
      await orderService.placeOrder(orderData);
      clearCart();
      setOrderPlaced(true);
    } catch (error) {
      setToast({ message: error.message, type: "error" });
    } finally {
      setLoading(false);
    }
  };

  if (orderPlaced) {
    return (
      <div className="checkout-page">
        <Header />
        <div className="checkout-container">
          <div className="order-success">
            <div className="success-icon-wrapper">
              <FiCheck className="success-icon" />
            </div>
            <h2>Order Placed Successfully!</h2>
            <p>Thank you for your purchase. Your order is being processed.</p>
            <Link to="/" className="back-to-shop" id="back-to-shop">
              Continue Shopping
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <Header />
      <div className="checkout-container">
        <h1 className="checkout-title">Checkout</h1>

        <div className="checkout-layout">
          <div className="checkout-items">
            <h3 className="checkout-section-title">Order Items</h3>
            {items.map((item) => (
              <div key={item._id} className="checkout-item">
                <div className="checkout-item-image">
                  {item.image ? (
                    <img src={item.image} alt={item.name} />
                  ) : (
                    <div className="checkout-item-placeholder">📦</div>
                  )}
                </div>
                <div className="checkout-item-info">
                  <span className="checkout-item-name">{item.name}</span>
                  <span className="checkout-item-qty">Qty: {item.quantity}</span>
                </div>
                <span className="checkout-item-price">
                  ₱{(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <div className="checkout-summary">
            <h3 className="checkout-section-title">Order Summary</h3>
            <div className="checkout-row">
              <span>Subtotal</span>
              <span>₱{cartTotal.toFixed(2)}</span>
            </div>
            <div className="checkout-row">
              <span>Shipping</span>
              <span className="free-label">Free</span>
            </div>
            <div className="checkout-divider" />
            <div className="checkout-row checkout-total">
              <span>Total</span>
              <span>₱{cartTotal.toFixed(2)}</span>
            </div>
            <button
              className="place-order-btn"
              onClick={handlePlaceOrder}
              disabled={loading}
              id="place-order-btn"
            >
              {loading ? "Processing..." : "Place Order"}
            </button>
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
