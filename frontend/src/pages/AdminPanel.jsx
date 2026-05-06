import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import AdminProductManager from "../components/admin/AdminProductManager";
import AdminOrderManager from "../components/admin/AdminOrderManager";
import AdminUserManager from "../components/admin/AdminUserManager";
import { getCurrentUser, isCurrentUserAdmin } from "../utils/auth";
import "./AdminPanel.css";

function AdminPanel() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({ products: 0, orders: 0, users: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [statsError, setStatsError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    // Verify admin access
    const verifyAdmin = async () => {
      try {
        const userData = getCurrentUser();
        if (!isCurrentUserAdmin()) {
          setError("Admin access required");
          setTimeout(() => navigate("/"), 2000);
          return;
        }
        setUser(userData);
        
        try {
          const statsRes = await api.get("/admin/stats/dashboard", {
            headers: { Authorization: `Bearer ${token}` }
          });
          const dashboardStats = statsRes.data.stats || {};

          setStats({
            products: dashboardStats.totalProducts || 0,
            orders: dashboardStats.totalOrders || 0,
            users: dashboardStats.totalUsers || 0
          });
        } catch (err) {
          console.error("Failed to load admin stats:", err);
          setStatsError("Dashboard stats could not be loaded right now.");
        }
      } catch (err) {
        console.error("Admin verification failed:", err);
        setError("Failed to load admin panel");
      } finally {
        setLoading(false);
      }
    };

    verifyAdmin();
  }, [navigate]);

  if (loading) return <div className="admin-loading">Loading Admin Panel...</div>;
  if (error) return <div className="admin-error">{error}</div>;

  return (
    <div className="admin-panel">
      <div className="admin-header">
        <h1>🔐 Admin Dashboard</h1>
        <p>Welcome, {user?.name} (Admin)</p>
      </div>

      {/* Admin Navigation */}
      <div className="admin-nav">
        <button
          className={`admin-nav-btn ${activeTab === "dashboard" ? "active" : ""}`}
          onClick={() => setActiveTab("dashboard")}
        >
          📊 Dashboard
        </button>
        <button
          className={`admin-nav-btn ${activeTab === "products" ? "active" : ""}`}
          onClick={() => setActiveTab("products")}
        >
          📦 Products
        </button>
        <button
          className={`admin-nav-btn ${activeTab === "orders" ? "active" : ""}`}
          onClick={() => setActiveTab("orders")}
        >
          📋 Orders
        </button>
        <button
          className={`admin-nav-btn ${activeTab === "users" ? "active" : ""}`}
          onClick={() => setActiveTab("users")}
        >
          👥 Users
        </button>
      </div>

      {/* Admin Content */}
      <div className="admin-content">
        {statsError && <div className="admin-warning">{statsError}</div>}

        {/* Dashboard View */}
        {activeTab === "dashboard" && (
          <div className="admin-dashboard">
            <h2>Dashboard Overview</h2>
            <div className="stats-grid">
              <div className="stat-card">
                <h3>📦 Total Products</h3>
                <p className="stat-number">{stats.products}</p>
              </div>
              <div className="stat-card">
                <h3>📋 Total Orders</h3>
                <p className="stat-number">{stats.orders}</p>
              </div>
              <div className="stat-card">
                <h3>👥 Total Users</h3>
                <p className="stat-number">{stats.users}</p>
              </div>
            </div>
          </div>
        )}

        {/* Product Management */}
        {activeTab === "products" && <AdminProductManager />}

        {/* Order Management */}
        {activeTab === "orders" && <AdminOrderManager />}

        {/* User Management */}
        {activeTab === "users" && <AdminUserManager />}
      </div>
    </div>
  );
}

export default AdminPanel;
