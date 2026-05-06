import { useNavigate } from "react-router-dom";
import "./Success.css";

function Success() {
  const navigate = useNavigate();

  return (
    <div className="success-container">
      <div className="success-card">
        <div className="success-icon">✓</div>

        <p className="success-eyebrow">Order confirmed</p>
        <h1>Order Placed Successfully!</h1>
        <p className="success-message">
          Thank you for your purchase. You can track your order status from the
          orders page.
        </p>

        <div className="success-actions">
          <button className="success-primary" onClick={() => navigate("/orders")}>
            View Orders
          </button>

          <button className="success-secondary" onClick={() => navigate("/")}>
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}

export default Success;
