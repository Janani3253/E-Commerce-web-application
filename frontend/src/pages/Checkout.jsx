import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Checkout.css";

function Checkout() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const userId = JSON.parse(atob(token.split(".")[1])).userId;

  const [paymentMethod, setPaymentMethod] = useState("COD");

  const placeOrder = async () => {
    try {
      await axios.post("http://localhost:5000/api/orders/place", {
        userId,
        paymentMethod
      });

      alert(`Order placed using ${paymentMethod}`);
      navigate("/success");

    } catch (err) {
      alert("Error placing order");
    }
  };

  return (
    <div className="checkout-container">

      <div className="checkout-box">

        <h2>Checkout</h2>

        {/* 🔥 PAYMENT SECTION */}
        <div className="payment-section">

          <h3>Select Payment Method</h3>

          <div className="payment-options">

            {/* COD */}
            <div
              className={`payment-card ${paymentMethod === "COD" ? "active" : ""}`}
              onClick={() => setPaymentMethod("COD")}
            >
              <input
                type="radio"
                checked={paymentMethod === "COD"}
                readOnly
              />
              <span>Cash on Delivery</span>
            </div>

            {/* CARD */}
            <div
              className={`payment-card ${paymentMethod === "Card" ? "active" : ""}`}
              onClick={() => setPaymentMethod("Card")}
            >
              <input
                type="radio"
                checked={paymentMethod === "Card"}
                readOnly
              />
              <span>Credit / Debit Card</span>
            </div>

          </div>
        </div>

        {/* 🔥 CARD DETAILS */}
        {paymentMethod === "Card" && (
          <div className="card-details">

            <input type="text" placeholder="Card Number" />
            <input type="text" placeholder="Card Holder Name" />

            <div className="card-row">
              <input type="text" placeholder="MM/YY" />
              <input type="text" placeholder="CVV" />
            </div>

          </div>
        )}

        {/* 🔥 BUTTON */}
        <button onClick={placeOrder}>
          Place Order
        </button>

      </div>

    </div>
  );
}

export default Checkout;