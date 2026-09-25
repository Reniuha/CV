import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/homepage.css";

const API = "http://localhost:5000";

function Homepage() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch(API + "/posts")
      .then((res) => res.json())
      .then((data) => setPosts(data));
  }, []);

  const featured = posts.slice(0, 3);

  return (
    <div className="homepage-container">
      <div className="hero">
        <h1 className="hero-title">Find Your Next Stay</h1>
      </div>

      <h2 className="center-title">Featured Listings</h2>

      <div className="listings-grid">
        {featured.map((post) => (
          <div
            key={post._id}
            className="listing-card"
            onClick={() => navigate(`/post/${post._id}`)}
          >
            <img src={post.img[0]} alt="" />
            <div className="info">
              <h3>{post.title}</h3>
              <p>€{post.price} / night</p>
            </div>
          </div>
        ))}
      </div>

      <footer className="footer">
        <p>© 2026 Roomly — School Project</p>
      </footer>
    </div>
  );
}

export default Homepage;
