const express = require("express");
const Post = require("../models/Post");
const multer = require("multer");

const router = express.Router();


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  }
});

const upload = multer({ storage });



router.post("/", upload.single("image"), async (req, res) => {
  try {
    const post = new Post({
      userId: req.body.userId,
      content: req.body.content,
      image: req.file ? req.file.filename : ""
    });

    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



router.get("/", async (req, res) => {
  try {
    const posts = await Post.find()
  .populate("userId", "name profilePic")
  .sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



router.post("/like/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post.likes.includes(req.body.userId)) {
      post.likes.push(req.body.userId);
    } else {
      post.likes = post.likes.filter(
        (id) => id.toString() !== req.body.userId
      );
    }

    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



router.put("/:id", async (req, res) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      { content: req.body.content },
      { new: true }
    );

    res.json(updatedPost);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



router.delete("/:id", async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.json({ message: "Post deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


module.exports = router;