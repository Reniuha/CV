import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../css/bookings.css";

const API = "http://localhost:5000";

function Bookings() {
  const [bookings, setBookings] = useState([]);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;

    fetch(API + "/bookings/" + user._id)
      .then(res => res.json())
      .then(data => setBookings(data))
      .catch(() => setBookings("error"));
  }, [user]);

  if (!user) {
    return (
      <div className="bookings-container">
        <h2 className="bookings-title">My Bookings</h2>
        <p className="no-bookings">You must be logged in to view bookings.</p>
      </div>
    );
  }

  if (bookings === "error") {
    return (
      <div className="bookings-container">
        <h2 className="bookings-title">My Bookings</h2>
        <p className="no-bookings">Failed to load bookings.</p>
      </div>
    );
  }

  const now = new Date();

  const upcoming = bookings.filter(b => new Date(b.endDate) >= now);
  const past = bookings.filter(b => new Date(b.endDate) < now);

  return (
    <div className="bookings-container">
      <h2 className="bookings-title">My Bookings</h2>

      <h3 className="section-title">Upcoming</h3>
      {upcoming.length === 0 && <p className="no-bookings">No upcoming bookings.</p>}
      {upcoming.map(b => (
        <div key={b._id} className="booking-item">
          <img src={b.postId.img[0]} alt="" />
          <div>
            <h3>{b.postId.title}</h3>
            <p>{b.startDate} → {b.endDate}</p>
            <p>Total: €{b.totalPrice}</p>
          </div>
        </div>
      ))}

      <h3 className="section-title">Past</h3>
      {past.length === 0 && <p className="no-bookings">No past bookings.</p>}
      {past.map(b => (
        <div key={b._id} className="booking-item">
          <img src={b.postId.img[0]} alt="" />
          <div>
            <h3>{b.postId.title}</h3>
            <p>{b.startDate} → {b.endDate}</p>
            <p>Total: €{b.totalPrice}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Bookings;