import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { isCurrentUserAdmin } from "../utils/auth";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        }
      );

      // Save token
      localStorage.setItem("token", res.data.token);

      // Save user data including admin status
      if (res.data.user) {
        localStorage.setItem("user", JSON.stringify(res.data.user));
      }

      alert("Login successful");

      // Redirect admins straight to their panel.
      navigate(isCurrentUserAdmin() ? "/admin" : "/");
    } catch (err) {
      console.log(err);
      alert("Login failed");
    }
  };

  return (
  <div className="login-container">
    <div className="login-box">
      <h2>Login</h2>

      <input
        type="email"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleLogin}>Login</button>

      <p style={{ textAlign: "center", marginTop: "10px" }}>
  Don’t have an account?{" "}
  <span
    style={{ color: "blue", cursor: "pointer" }}
    onClick={() => navigate("/register")}
  >
    Register
  </span>
</p>
    </div>
  </div>
);
}

export default Login;
