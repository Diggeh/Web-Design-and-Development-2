import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../contexts/CartContext";
import { FiShoppingCart, FiLogOut, FiUser } from "react-icons/fi";
import "../styles/Header.css";

export default function Header() {
  const { user, isAuthenticated, logout } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <header className="navbar" id="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <span className="brand-icon">🛍️</span>
          <span className="brand-text">ShopHub</span>
        </Link>

        <nav className="navbar-links">
          <Link to="/" className="nav-link" id="nav-home">Home</Link>
          {isAuthenticated && user?.role === "admin" && (
            <Link to="/admin" className="nav-link" id="nav-admin">Dashboard</Link>
          )}
        </nav>

        <div className="navbar-actions">
          <Link to="/cart" className="cart-link" id="nav-cart">
            <FiShoppingCart className="cart-icon" />
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>

          {isAuthenticated ? (
            <div className="user-section">
              <span className="user-greeting">
                <FiUser className="user-icon" />
                {user?.username}
              </span>
              <button className="logout-btn" onClick={handleLogout} id="logout-btn">
                <FiLogOut />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <div className="auth-buttons">
              <Link to="/login" className="btn-login" id="nav-login">Log In</Link>
              <Link to="/register" className="btn-register" id="nav-register">Sign Up</Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
