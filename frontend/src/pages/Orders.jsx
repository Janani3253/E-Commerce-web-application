import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Orders.css";

function Orders() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0
    }).format(amount || 0);

  const formatDate = (date) =>
    new Intl.DateTimeFormat("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    }).format(new Date(date));

  const getUserId = () => {
    if (!token) return null;

    try {
      return JSON.parse(atob(token.split(".")[1])).userId;
    } catch (err) {
      console.log(err);
      return null;
    }
  };

  useEffect(() => {
    try {
      const userData = JSON.parse(localStorage.getItem("user") || "{}");
      if (userData.isAdmin) {
        navigate("/admin");
      }
    } catch (err) {
      console.log(err);
    }
  }, [navigate]);

  useEffect(() => {
    const userId = getUserId();

    if (!userId) {
      navigate("/login");
      return;
    }

    axios
      .get(`http://localhost:5000/api/orders/${userId}`)
      .then((res) => setOrders(res.data || []))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [navigate, token]);

  return (
    <div className="orders-container">
      <div className="orders-header">
        <div>
          <p className="orders-eyebrow">Order history</p>
          <h2>Your Orders</h2>
        </div>

        <button className="orders-shop-btn" onClick={() => navigate("/")}>
          Continue Shopping
        </button>
      </div>

      {loading ? (
        <div className="orders-state">Loading your orders...</div>
      ) : orders.length === 0 ? (
        <div className="orders-empty">
          <h3>No orders yet</h3>
          <p>Items you checkout will appear here with their status and total.</p>
          <button onClick={() => navigate("/")}>Browse Products</button>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map((order) => {
            const status = order.status || "Processing";
            const itemCount = order.products?.length || 0;

            return (
              <article className="order-card" key={order._id}>
                <div className="order-card-header">
                  <div>
                    <span className="order-label">Order ID</span>
                    <h4>{order._id}</h4>
                  </div>

                  <span className={`status ${status.toLowerCase()}`}>
                    {status}
                  </span>
                </div>

                <div className="order-details">
                  <div>
                    <span className="order-label">Total</span>
                    <strong>{formatCurrency(order.totalAmount)}</strong>
                  </div>

                  <div>
                    <span className="order-label">Items</span>
                    <strong>
                      {itemCount || "Not available"}
                      {itemCount === 1 ? " item" : itemCount > 1 ? " items" : ""}
                    </strong>
                  </div>

                  <div>
                    <span className="order-label">Placed on</span>
                    <strong>{formatDate(order.createdAt)}</strong>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Orders;
