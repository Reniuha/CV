const express = require("express");
const Post = require("../models/Post");

const router = express.Router();

router.get("/", async (req, res) => {
  const posts = await Post.find();

  res.status(200).json(posts);
});

router.get("/:id", async (req, res) => {
  const post = await Post.findById(req.params.id);

  res.status(200).json(post);
});

router.post("/", async (req, res) => {
  const { signedIn, title, description, price, rooms, img } = req.body;

  if (!signedIn) {
    return res
      .status(401)
      .json({ message: "You must be signed in to create a post" });
  }

  const newPost = new Post(title, description, price, rooms, img);

  await newPost.save();

  res.status(201).json(newPost);
});

module.exports = router;
