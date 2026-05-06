import { useEffect, useState } from "react";
import axios from "axios";
import "./Cart.css";
import { useNavigate } from "react-router-dom";

function Cart() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const userId = JSON.parse(atob(token.split(".")[1])).userId;

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/cart/${userId}`)
      .then((res) => setCart(res.data?.products || []))
      .catch((err) => console.log(err));
  }, []);

  const removeItem = async (id) => {
    await axios.post("http://localhost:5000/api/cart/remove", {
      userId,
      productId: id,
    });

    setCart(cart.filter((item) => item.productId !== id));
  };

  const updateQuantity = async (id, action) => {
    await axios.post("http://localhost:5000/api/cart/update", {
      userId,
      productId: id,
      action,
    });

    const res = await axios.get(
      `http://localhost:5000/api/cart/${userId}`
    );
    setCart(res.data.products);
  };

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="cart-container">

      <h2 className="cart-title">🛒 Your Cart</h2>

      <div className="cart-list">

        {cart.map((item) => (
          <div className="cart-item" key={item.productId}>

            <div className="cart-left">
              <img src={item.image} alt={item.name} />

              <div className="cart-info">
                <h4>{item.name}</h4>
                <p className="price">₹{item.price}</p>

                {/* Quantity */}
                <div className="qty-control">

                  <button
                    className="qty-btn minus"
                    onClick={() =>
                      updateQuantity(item.productId, "dec")
                    }
                  >
                    −
                  </button>

                  <span className="qty-value">
                    {item.quantity}
                  </span>

                  <button
                    className="qty-btn plus"
                    onClick={() =>
                      updateQuantity(item.productId, "inc")
                    }
                  >
                    +
                  </button>

                </div>
              </div>
            </div>

            <button
              className="remove-btn"
              onClick={() => removeItem(item.productId)}
            >
              Remove
            </button>

          </div>
        ))}

      </div>

      <div className="cart-total">
        <h3>Total: ₹{total}</h3>

        <button
          className="checkout-btn"
          onClick={() => navigate("/checkout")}
        >
          Checkout →
        </button>
      </div>

    </div>
  );
}

export default Cart;