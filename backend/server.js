const express = require("express");
const cors = require("cors");
const postRoutes = require("./routes/postRoutes");
const userRoutes = require("./routes/userRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const connectDB = require("./config/db");

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.use("/posts", postRoutes);
app.use("/auth", userRoutes);
app.use("/bookings", bookingRoutes);

app.listen(5000, () => {
  console.log("Server is running on http://localhost:5000");
});
