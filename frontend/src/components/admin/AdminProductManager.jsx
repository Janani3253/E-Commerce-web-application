import { useState, useEffect } from "react";
import api from "../../services/api";
import "./AdminProductManager.css";

function AdminProductManager() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    image: "",
    description: "",
    brand: "",
    warranty: "",
    offers: "",
    discount: ""
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const token = localStorage.getItem("token");

  // Fetch all products
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await api.get("/admin/products", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProducts(res.data.products);
      setError("");
    } catch (err) {
      setError("Failed to fetch products");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editingId) {
        // Update product
        await api.put(`/admin/products/${editingId}`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setSuccess("✅ Product updated successfully!");
      } else {
        // Add new product
        await api.post("/admin/products", formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setSuccess("✅ Product added successfully!");
      }

      setFormData({
        name: "",
        price: "",
        image: "",
        description: "",
        brand: "",
        warranty: "",
        offers: "",
        discount: ""
      });
      setEditingId(null);
      setShowForm(false);
      fetchProducts();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save product");
    } finally {
      setLoading(false);
    }
  };

  const handleEditProduct = (product) => {
    setFormData(product);
    setEditingId(product._id);
    setShowForm(true);
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await api.delete(`/admin/products/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setSuccess("✅ Product deleted successfully!");
        fetchProducts();
      } catch (err) {
        setError("Failed to delete product");
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      price: "",
      image: "",
      description: "",
      brand: "",
      warranty: "",
      offers: "",
      discount: ""
    });
    setEditingId(null);
    setShowForm(false);
  };

  return (
    <div className="product-manager">
      <div className="product-header">
        <h2>📦 Product Management</h2>
        <button
          className="btn-add"
          onClick={() => (showForm ? resetForm() : setShowForm(true))}
        >
          {showForm ? "❌ Cancel" : "➕ Add Product"}
        </button>
      </div>

      {error && <div className="alert alert-error">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      {/* Add/Edit Product Form */}
      {showForm && (
        <div className="product-form">
          <h3>{editingId ? "Edit Product" : "Add New Product"}</h3>
          <form onSubmit={handleAddProduct}>
            <div className="form-row">
              <input
                type="text"
                name="name"
                placeholder="Product Name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
              <input
                type="number"
                name="price"
                placeholder="Price"
                value={formData.price}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-row">
              <input
                type="text"
                name="brand"
                placeholder="Brand"
                value={formData.brand}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="discount"
                placeholder="Discount %"
                value={formData.discount}
                onChange={handleInputChange}
              />
            </div>

            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleInputChange}
              rows="3"
            ></textarea>

            <div className="form-row">
              <input
                type="text"
                name="image"
                placeholder="Image URL"
                value={formData.image}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="warranty"
                placeholder="Warranty"
                value={formData.warranty}
                onChange={handleInputChange}
              />
            </div>

            <input
              type="text"
              name="offers"
              placeholder="Special Offers"
              value={formData.offers}
              onChange={handleInputChange}
            />

            <button
              type="submit"
              className="btn-submit"
              disabled={loading}
            >
              {loading ? "Saving..." : editingId ? "Update Product" : "Add Product"}
            </button>
          </form>
        </div>
      )}

      {/* Products List */}
      <div className="products-list">
        <h3>Total Products: {products.length}</h3>
        {loading && !showForm && <p>Loading products...</p>}
        {products.length === 0 ? (
          <p className="no-data">No products found</p>
        ) : (
          <div className="products-grid">
            {products.map((product) => (
              <div key={product._id} className="product-card">
                <img src={product.image} alt={product.name} />
                <div className="product-info">
                  <h4>{product.name}</h4>
                  <p><strong>Price:</strong> ₹{product.price}</p>
                  <p><strong>Brand:</strong> {product.brand || "N/A"}</p>
                  <p><strong>Discount:</strong> {product.discount || "N/A"}%</p>
                  <p className="desc">{product.description}</p>
                </div>
                <div className="product-actions">
                  <button
                    className="btn-edit"
                    onClick={() => handleEditProduct(product)}
                  >
                    ✏️ Edit
                  </button>
                  <button
                    className="btn-delete"
                    onClick={() => handleDeleteProduct(product._id)}
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminProductManager;
