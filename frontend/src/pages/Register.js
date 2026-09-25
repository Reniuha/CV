import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../img/logo.png";
import "../css/login.css";

const API = "http://localhost:5000";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [confirm, setConfirm] = useState("");
  const navigate = useNavigate();

  const register = () => {
    if (pass !== confirm) {
      alert("Passwords do not match");
      return;
    }

    fetch(API + "/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        email,
        password: pass
      })
    })
      .then(res => res.json())
      .then(() => navigate("/login"));
  };

  return (
    <div className="login-container">
      <img src={logo} className="logo-img" alt="Roomly Logo" />

      <h2>Create Account</h2>

      <input
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />

      <input
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />

      <input
        placeholder="Password"
        type="password"
        value={pass}
        onChange={e => setPass(e.target.value)}
      />

      <input
        placeholder="Confirm Password"
        type="password"
        value={confirm}
        onChange={e => setConfirm(e.target.value)}
      />

      <button className="btn" onClick={register}>Register</button>

      <p className="link" onClick={() => navigate("/login")}>
        Already have an account? Login
      </p>
    </div>
  );
}

export default Register;
