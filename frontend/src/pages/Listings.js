import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../img/logo.png";
import "../css/listings.css";

const API = "http://localhost:5000";

function Listings() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(API + "/posts")
      .then(res => res.json())
      .then(data => setPosts(data));
  }, []);

  return (
    <div className="listings-container">
      <img src={logo} className="listings-logo" alt="Roomly Logo" />

      <h2 className="listings-title">All Listings</h2>

      <div className="listings-grid">
        {posts.map(post => (
          <div
            key={post._id}
            className="listing-card"
            onClick={() => navigate(`/post/${post._id}`)}
          >
            <img src={post.img[0]} alt={post.title} />
            <div className="info">
              <h3>{post.title}</h3>
              <p>€{post.price} / night</p>
              <p>{post.rooms} rooms</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Listings;
