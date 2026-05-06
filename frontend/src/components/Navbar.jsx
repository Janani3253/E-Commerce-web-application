import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getCurrentUser, getCurrentUserId, isCurrentUserAdmin } from "../utils/auth";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const [count, setCount] = useState(0);

  const token = localStorage.getItem("token");
  const currentUser = token ? getCurrentUser() : {};
  const userName = currentUser.name || "User";
  const isAdmin = token ? isCurrentUserAdmin() : false;

  useEffect(() => {
    if (!token || isAdmin) return;

    const userId = getCurrentUserId();
    if (!userId) return;

    axios
      .get(`http://localhost:5000/api/cart/${userId}`)
      .then((res) => {
        const items = res.data?.products || [];
        const totalQty = items.reduce((sum, item) => sum + item.quantity, 0);
        setCount(totalQty);
      })
      .catch((err) => console.log(err));
  }, [token, isAdmin]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <header className="navbar">
      <div className="nav-left">
        <h2 className="logo" onClick={() => navigate("/")}>
          Electro Hub
        </h2>

        {token && <span className="username">Hi, {userName}</span>}
      </div>

      <nav className="nav-center">
        {!isAdmin ? (
          <>
            <span onClick={() => navigate("/")} className="nav-item">
              Products
            </span>

            <span onClick={() => navigate("/cart")} className="nav-item">
              Cart
            </span>

            <span onClick={() => navigate("/orders")} className="nav-item">
              Orders
            </span>
          </>
        ) : (
          <span onClick={() => navigate("/")} className="nav-item">
            Browse Products
          </span>
        )}
      </nav>

      <div className="nav-right">
        {!isAdmin && (
          <div className="cart" onClick={() => navigate("/cart")}>
            Cart
            {count > 0 && <span className="badge">{count}</span>}
          </div>
        )}

        {isAdmin && <div className="admin-status">Admin</div>}

        {token ? (
          <button className="btn logout" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <button className="btn login" onClick={() => navigate("/login")}>
            Login
          </button>
        )}
      </div>
    </header>
  );
}

export default Navbar;
