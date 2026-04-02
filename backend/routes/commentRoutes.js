const express = require("express");
const Comment = require("../models/Comment");

const router = express.Router();


router.post("/:postId", async (req, res) => {
  const comment = new Comment({
    postId: req.params.postId,
    userId: req.body.userId,
    text: req.body.text
  });

  await comment.save();
  res.json(comment);
});


router.get("/:postId", async (req, res) => {
  const comments = await Comment.find({ postId: req.params.postId });
  res.json(comments);
});

module.exports = router;