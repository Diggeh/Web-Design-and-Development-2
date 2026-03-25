import { Link } from "react-router-dom";
import "../styles/Footer.css";

export default function Footer() {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-brand">
          <h3>🛍️ ShopHub</h3>
          <p>Your one-stop shop for premium products at unbeatable prices.</p>
        </div>
        <div className="footer-links">
          <div className="link-group">
            <h4>Quick Links</h4>
            <Link to="/">Home</Link>
            <Link to="/cart">Cart</Link>
            <Link to="/login">Login</Link>
            <Link to="/register">Sign Up</Link>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2026 ShopHub. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
