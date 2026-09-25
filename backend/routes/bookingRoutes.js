const express = require("express");
const Booking = require("../models/Booking");
const Post = require("../models/Post");

const router = express.Router();

router.post("/", async (req, res) => {
  const { signedIn, userId, postId, startDate, endDate } = req.body;

  if (!signedIn) {
    return res.status(401).json({ message: "You must be signed in to book." });
  }

  const overlapping = await Booking.findOne({
    postId,
    $or: [{ startDate: { $lte: endDate }, endDate: { $gte: startDate } }],
  });

  if (overlapping) {
    return res
      .status(409)
      .json({ message: "This place is already booked for those dates." });
  }

  const post = await Post.findById(postId);
  const days =
    (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24);
  const totalPrice = post.price * days;

  const booking = new Booking({
    userId,
    postId,
    startDate,
    endDate,
    totalPrice,
  });

  await booking.save();

  res.status(201).json(booking);
});

router.get("/:userId", async (req, res) => {
  const bookings = await Booking.find({ userId: req.params.userId }).populate(
    "postId",
  );
  res.status(200).json(bookings);
});

module.exports = router;
