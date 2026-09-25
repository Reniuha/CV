import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import logo from "../img/logo.png";
import "../css/navbar.css";

function Navbar() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="navbar">
      <img src={logo} className="navbar-logo" onClick={() => navigate("/")} alt="logo"/>

      <div className="navbar-links">
        <button className="btn" onClick={() => navigate("/")}>Home</button>
        <button className="btn" onClick={() => navigate("/listings")}>Listings</button>
        <button className="btn" onClick={() => navigate("/bookings")}>Bookings</button>

        {!user && (
          <>
            <button className="btn" onClick={() => navigate("/login")}>Login</button>
            <button className="btn" onClick={() => navigate("/register")}>Register</button>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
