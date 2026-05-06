import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import "./HomePage.css";
import { useNavigate } from "react-router-dom";
import ProductDetails from "./ProductDetails";

function HomePage() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  
  const [selectedProduct, setSelectedProduct] = useState(null);
  // 🔥 Get products
  useEffect(() => {
    axios.get("http://localhost:5000/api/products")
      .then(res => setProducts(res.data))
      .catch(err => console.log(err));
  }, []);

  // 🔥 Add to Cart
  const addToCart = async (product) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login first");
        navigate("/login");
        return;
      }

      const userId = JSON.parse(atob(token.split(".")[1])).userId;

      await axios.post("http://localhost:5000/api/cart/add", {
        userId,
        product: {
          productId: product._id,
          name: product.name,
          price: product.price,
          image: product.image
        }
      });

      alert("Added to cart");

    } catch (err) {
      console.log(err);
      alert("Error adding to cart");
    }
  };

  return (
    <div className="home-container">

      {/* 🔥 Title */}
      <div className="home-header">
        <h2 className="home-title">Products</h2>
      </div>

      {/* 🔥 Product Grid */}
      <div className="product-grid">
        {products.map((p) => (
          <ProductCard
            key={p._id}
            product={p}
            addToCart={addToCart}
          />
        ))}
      </div>

    </div>
  );
}

export default HomePage;