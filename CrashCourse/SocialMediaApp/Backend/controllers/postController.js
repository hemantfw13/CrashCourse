const express = require("express");
const Post = require("../models/Post");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", authMiddleware, async (req, res) => {
  try {
    const posts = await Post.find({ user: req.user._id });
    res.send(posts);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/add", authMiddleware, async (req, res) => {
  try {
    const post = new Post({
      ...req.body,
      user: req.user._id,
    });
    await post.save();
    res.status(201).send(post);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.patch("/update/:id", authMiddleware, async (req, res) => {
  const allowedUpdates = ["title", "body", "device"];
  const updates = Object.keys(req.body);
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    const post = await Post.findOne({ _id: req.params.id, user: req.user._id });

    if (!post) {
      return res.status(404).send();
    }

    updates.forEach((update) => (post[update] = req.body[update]));
    await post.save();

    res.send(post);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete("/delete/:id", authMiddleware, async (req, res) => {
  try {
    const post = await Post.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!post) {
      return res.status(404).send();
    }

    res.send(post);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
