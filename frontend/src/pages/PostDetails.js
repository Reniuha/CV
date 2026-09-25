import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../css/postdetails.css";

const API = "http://localhost:5000";

function PostDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [post, setPost] = useState(null);
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  useEffect(() => {
    fetch(API + "/posts/" + id)
      .then(res => {
        if (!res.ok) throw new Error("Not found");
        return res.json();
      })
      .then(data => setPost(data))
      .catch(() => setPost("error"));
  }, [id]);

  if (!post) return <div className="loading">Loading...</div>;
  if (post === "error") return <div className="loading">Failed to load post.</div>;

  const bookNow = () => {
    if (!user) {
      alert("You must be logged in to book.");
      return;
    }

    fetch(API + "/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        signedIn: true,
        userId: user._id,
        postId: id,
        startDate: start,
        endDate: end
      })
    })
      .then(res => res.json())
      .then(data => {
        alert("Booking successful!");
        navigate("/bookings");
      });
  };

  return (
    <div className="post-container">

      <button className="btn back-btn" onClick={() => navigate("/listings")}>
        Back to Listings
      </button>

      <h2 className="post-title">{post.title}</h2>

      <div className="gallery">
        {post.img.map((url, i) => (
          <img key={i} src={url} alt="" />
        ))}
      </div>

      <div className="details-box">
        <p><strong>Price:</strong> €{post.price} / night</p>
        <p><strong>Rooms:</strong> {post.rooms}</p>
        <p><strong>Description:</strong> {post.description}</p>
      </div>

      <div className="booking-box">
        <label className="date-label">From:</label>
        <input type="date" value={start} onChange={e => setStart(e.target.value)} />

        <label className="date-label">To:</label>
        <input type="date" value={end} onChange={e => setEnd(e.target.value)} />

        <button className="btn" onClick={bookNow}>Book Now</button>
      </div>
    </div>
  );
}

export default PostDetails;
