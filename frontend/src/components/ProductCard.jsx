import "./ProductCard.css";
import { useNavigate } from "react-router-dom";

function ProductCard({ product, addToCart }) {
  const navigate = useNavigate();

  return (
    <div 
      className="card"
      onClick={() => navigate(`/product/${product._id}`)}
    >
      <img src={product.image} alt={product.name} />

      <h3>{product.name}</h3>
      <p>{product.brand}</p>
      <p>₹{product.price}</p>

      <button 
        onClick={(e) => {
          e.stopPropagation();
          addToCart(product);
        }}
      >
        Add to Cart
      </button>
    </div>
  );
}

export default ProductCard;