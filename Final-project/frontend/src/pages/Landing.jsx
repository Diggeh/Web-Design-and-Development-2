import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import SearchBar from "../components/SearchBar";
import Toast from "../components/Toast";
import { productService } from "../services/productService";
import { useCart } from "../contexts/CartContext";
import "../styles/Landing.css";

export default function Landing() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [toast, setToast] = useState(null);
  const { cartCount } = useCart();
  const [prevCount, setPrevCount] = useState(cartCount);

  useEffect(() => {
    fetchProducts();
  }, [search, category]);

  useEffect(() => {
    if (cartCount > prevCount) {
      setToast({ message: "Added to cart!", type: "success" });
    }
    setPrevCount(cartCount);
  }, [cartCount]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await productService.getAll(search, category);
      setProducts(data);
    } catch (error) {
      setToast({ message: error.message, type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="landing-page">
      <Header />
      <section className="hero-section">
        <div className="hero-inner">
          <h1 className="hero-title">
            Discover Products <br />
            <span className="hero-highlight">You'll Love</span>
          </h1>
          <p className="hero-subtitle">
            Curated collection of premium products at unbeatable prices
          </p>
        </div>
      </section>

      <main className="products-section" id="products-section">
        <div className="products-container">
          <SearchBar
            onSearch={setSearch}
            onCategoryChange={setCategory}
            currentCategory={category}
          />

          {loading ? (
            <div className="loading-grid">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="skeleton-card">
                  <div className="skeleton-image" />
                  <div className="skeleton-body">
                    <div className="skeleton-line wide" />
                    <div className="skeleton-line" />
                    <div className="skeleton-line short" />
                  </div>
                </div>
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="empty-state">
              <span className="empty-icon">🔍</span>
              <h3>No products found</h3>
              <p>Try adjusting your search or filter criteria</p>
            </div>
          ) : (
            <div className="products-grid" id="products-grid">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
