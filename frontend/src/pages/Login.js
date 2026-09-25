import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import logo from "../img/logo.png";
import "../css/login.css";

const API = "http://localhost:5000";

function Login() {
  const [username, setUsername] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  const login = () => {
    fetch(API + "/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password: pass })
    })
      .then(res => res.json())
      .then(data => {
        setUser(data);
        navigate("/");
      });
  };

  return (
    <div className="login-container">
      <img src={logo} className="logo-img" alt="Roomly Logo" />

      <h2>Login</h2>

      <input
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />

      <input
        placeholder="Password"
        type="password"
        value={pass}
        onChange={e => setPass(e.target.value)}
      />

      <button className="btn" onClick={login}>Login</button>

      <p className="link" onClick={() => navigate("/register")}>
        Don't have an account? Register
      </p>
    </div>
  );
}

export default Login;
