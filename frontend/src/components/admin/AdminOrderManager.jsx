import { useState, useEffect } from "react";
import api from "../../services/api";
import "./AdminOrderManager.css";

function AdminOrderManager() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);

  const token = localStorage.getItem("token");

  // Fetch all orders
  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await api.get("/admin/orders", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setOrders(res.data.orders);
      setError("");
    } catch (err) {
      setError("Failed to fetch orders");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      await api.put(
        `/admin/orders/${orderId}`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSuccess("✅ Order status updated!");
      fetchOrders();
      setSelectedOrder(null);
    } catch (err) {
      setError("Failed to update order status");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Processing":
        return "#ffc107";
      case "Shipped":
        return "#17a2b8";
      case "Delivered":
        return "#28a745";
      case "Cancelled":
        return "#dc3545";
      default:
        return "#6c757d";
    }
  };

  return (
    <div className="order-manager">
      <div className="order-header">
        <h2>📋 Order Management</h2>
        <button onClick={fetchOrders} className="btn-refresh">
          🔄 Refresh
        </button>
      </div>

      {error && <div className="alert alert-error">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <div className="orders-container">
        {loading ? (
          <p>Loading orders...</p>
        ) : orders.length === 0 ? (
          <p className="no-data">No orders found</p>
        ) : (
          <div>
            <div className="orders-list">
              {orders.map((order) => (
                <div key={order._id} className="order-item">
                  <div className="order-basic-info">
                    <div>
                      <strong>Order ID:</strong> {order._id.slice(0, 8)}...
                    </div>
                    <div>
                      <strong>User ID:</strong> {order.userId.slice(0, 8)}...
                    </div>
                    <div>
                      <strong>Total:</strong> ₹{order.totalAmount}
                    </div>
                    <div>
                      <strong>Date:</strong>{" "}
                      {new Date(order.createdAt).toLocaleDateString()}
                    </div>
                  </div>

                  <div className="order-status">
                    <span
                      className="status-badge"
                      style={{ backgroundColor: getStatusColor(order.status) }}
                    >
                      {order.status}
                    </span>
                  </div>

                  <button
                    className="btn-view-details"
                    onClick={() =>
                      setSelectedOrder(
                        selectedOrder?._id === order._id ? null : order
                      )
                    }
                  >
                    {selectedOrder?._id === order._id ? "▼ Hide" : "▶ Details"}
                  </button>
                </div>
              ))}
            </div>

            {/* Order Details Modal */}
            {selectedOrder && (
              <div className="order-details-modal">
                <div className="modal-content">
                  <button
                    className="btn-close"
                    onClick={() => setSelectedOrder(null)}
                  >
                    ✕
                  </button>

                  <h3>Order Details</h3>

                  <div className="details-section">
                    <h4>Order Information</h4>
                    <p>
                      <strong>Order ID:</strong> {selectedOrder._id}
                    </p>
                    <p>
                      <strong>User ID:</strong> {selectedOrder.userId}
                    </p>
                    <p>
                      <strong>Total Amount:</strong> ₹{selectedOrder.totalAmount}
                    </p>
                    <p>
                      <strong>Date:</strong>{" "}
                      {new Date(selectedOrder.createdAt).toLocaleString()}
                    </p>
                  </div>

                  <div className="details-section">
                    <h4>Products</h4>
                    <div className="products-in-order">
                      {selectedOrder.products?.map((product, idx) => (
                        <div key={idx} className="product-item-in-order">
                          <p>
                            <strong>{product.name}</strong>
                          </p>
                          <p>Qty: {product.quantity || 1}</p>
                          <p>Price: ₹{product.price}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="details-section">
                    <h4>Update Status</h4>
                    <div className="status-buttons">
                      {["Processing", "Shipped", "Delivered", "Cancelled"].map(
                        (status) => (
                          <button
                            key={status}
                            className={`status-update-btn ${
                              selectedOrder.status === status ? "active" : ""
                            }`}
                            onClick={() =>
                              handleStatusUpdate(selectedOrder._id, status)
                            }
                          >
                            {status}
                          </button>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminOrderManager;
