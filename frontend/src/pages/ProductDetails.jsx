import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./ProductDetails.css";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div className="modal-overlay">

      <div className="modal-box">

        {/* Close Button */}
        <span className="close-btn" onClick={() => navigate(-1)}>
          ✖
        </span>

        {/* Image */}
        <img src={product.image} alt={product.name} />

        {/* Content */}
        <div className="details-content">

          <h2>{product.name}</h2>
          <h3>₹{product.price}</h3>

          <p><strong>Description:</strong> {product.description}</p>
          <p><strong>Brand:</strong> {product.brand}</p>
          <p><strong>Warranty:</strong> {product.warranty}</p>
          <p><strong>Offers:</strong> {product.offers}</p>
          <p><strong>Discount:</strong> {product.discount}</p>

        </div>

      </div>

    </div>
  );
}

export default ProductDetails;