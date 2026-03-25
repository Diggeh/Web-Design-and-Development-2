import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { productService } from "../services/productService";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Toast from "../components/Toast";
import slugify from "slugify";
import { FiPlus, FiEdit2, FiTrash2, FiX } from "react-icons/fi";
import "../styles/AdminDashboard.css";

export default function AdminDashboard() {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    price: "",
    image: "",
    category: "General",
  });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    fetchProducts();
  }, [isAuthenticated]);

  const fetchProducts = async () => {
    try {
      const data = await productService.getAll();
      setProducts(data);
    } catch (error) {
      setToast({ message: error.message, type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (formData.name && !editingId) {
      setFormData((prev) => ({
        ...prev,
        slug: slugify(formData.name, { lower: true, strict: true }),
      }));
    }
  }, [formData.name, editingId]);

  const resetForm = () => {
    setFormData({ name: "", slug: "", description: "", price: "", image: "", category: "General" });
    setEditingId(null);
    setShowForm(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = { ...formData, price: parseFloat(formData.price) };
      if (editingId) {
        await productService.update(editingId, data);
        setToast({ message: "Product updated!", type: "success" });
      } else {
        await productService.create(data);
        setToast({ message: "Product created!", type: "success" });
      }
      resetForm();
      fetchProducts();
    } catch (error) {
      setToast({ message: error.message, type: "error" });
    }
  };

  const handleEdit = (product) => {
    setFormData({
      name: product.name,
      slug: product.slug,
      description: product.description || "",
      price: product.price.toString(),
      image: product.image || "",
      category: product.category || "General",
    });
    setEditingId(product._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      await productService.remove(id);
      setToast({ message: "Product deleted!", type: "success" });
      fetchProducts();
    } catch (error) {
      setToast({ message: error.message, type: "error" });
    }
  };

  return (
    <div className="admin-page">
      <Header />
      <div className="admin-container">
        <div className="admin-header">
          <h1 className="admin-title">Product Dashboard</h1>
          <button
            className="admin-add-btn"
            onClick={() => { resetForm(); setShowForm(true); }}
            id="add-product-btn"
          >
            <FiPlus /> Add Product
          </button>
        </div>

        {showForm && (
          <div className="admin-form-overlay">
            <div className="admin-form-card">
              <div className="admin-form-header">
                <h3>{editingId ? "Edit Product" : "Add New Product"}</h3>
                <button className="admin-form-close" onClick={resetForm}>
                  <FiX />
                </button>
              </div>
              <form onSubmit={handleSubmit} className="admin-form" id="product-form">
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Name</label>
                    <input
                      type="text"
                      name="name"
                      className="form-input"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      id="product-name"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Slug</label>
                    <input
                      type="text"
                      name="slug"
                      className="form-input"
                      value={formData.slug}
                      disabled
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Description</label>
                  <textarea
                    name="description"
                    className="form-input form-textarea"
                    value={formData.description}
                    onChange={handleChange}
                    rows={3}
                    id="product-description"
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Price (₱)</label>
                    <input
                      type="number"
                      name="price"
                      className="form-input"
                      value={formData.price}
                      onChange={handleChange}
                      step="0.01"
                      min="0"
                      required
                      id="product-price"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Category</label>
                    <select
                      name="category"
                      className="form-input"
                      value={formData.category}
                      onChange={handleChange}
                      id="product-category"
                    >
                      <option value="General">General</option>
                      <option value="Electronics">Electronics</option>
                      <option value="Fashion">Fashion</option>
                      <option value="Home">Home</option>
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Image URL</label>
                  <input
                    type="text"
                    name="image"
                    className="form-input"
                    value={formData.image}
                    onChange={handleChange}
                    placeholder="https://..."
                    id="product-image"
                  />
                </div>
                <button type="submit" className="admin-submit-btn" id="product-submit">
                  {editingId ? "Update Product" : "Create Product"}
                </button>
              </form>
            </div>
          </div>
        )}

        {loading ? (
          <div className="admin-loading">Loading products...</div>
        ) : (
          <div className="admin-table-wrapper">
            <table className="admin-table" id="products-table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id}>
                    <td>
                      <div className="admin-table-img">
                        {product.image ? (
                          <img src={product.image} alt={product.name} />
                        ) : (
                          <span>📦</span>
                        )}
                      </div>
                    </td>
                    <td>
                      <span className="admin-product-name">{product.name}</span>
                    </td>
                    <td>
                      <span className="admin-category-badge">{product.category}</span>
                    </td>
                    <td className="admin-price">₱{product.price.toFixed(2)}</td>
                    <td>
                      <div className="admin-actions">
                        <button
                          className="admin-edit-btn"
                          onClick={() => handleEdit(product)}
                        >
                          <FiEdit2 />
                        </button>
                        <button
                          className="admin-delete-btn"
                          onClick={() => handleDelete(product._id)}
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {products.length === 0 && (
              <div className="admin-empty">No products yet. Add your first product!</div>
            )}
          </div>
        )}
      </div>
      <Footer />

      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
      )}
    </div>
  );
}
