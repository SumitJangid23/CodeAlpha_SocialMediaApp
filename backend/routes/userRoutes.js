const express = require("express");
const User = require("../models/User");

const router = express.Router();
const multer = require("multer");


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  }
});

const upload = multer({ storage });


router.put("/upload/:id", upload.single("image"), async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    user.profilePic = req.file.filename;

    await user.save();

    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.post("/follow/:id", async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "UserId missing" });
    }

    const currentUser = await User.findById(userId);
    const userToFollow = await User.findById(req.params.id);

    if (!currentUser || !userToFollow) {
      return res.status(404).json({ message: "User not found" });
    }

    const alreadyFollowing = currentUser.following.some(
      (id) => id.toString() === req.params.id
    );

    if (!alreadyFollowing) {
     
      currentUser.following.push(userToFollow._id);
      userToFollow.followers.push(currentUser._id);
    } else {
     
      currentUser.following = currentUser.following.filter(
        (id) => id.toString() !== req.params.id
      );

      userToFollow.followers = userToFollow.followers.filter(
        (id) => id.toString() !== userId
      );
    }

    await currentUser.save();
    await userToFollow.save();

    res.json({ message: "Follow updated" });

  } catch (err) {
    res.status(500).json(err);
  }
});
router.get("/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  res.json(user);
});

router.get("/search/:query", async (req, res) => {
  const users = await User.find({
    name: { $regex: req.params.query, $options: "i" }
  });

  res.json(users);
});
module.exports = router;