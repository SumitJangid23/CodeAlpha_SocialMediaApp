const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();


app.use(express.json());
app.use(cors());


app.get("/", (req, res) => {
  res.send("API is running...");
});


app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/posts", require("./routes/postRoutes"));
app.use("/api/comments", require("./routes/commentRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/uploads", express.static("uploads"));


mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log("✅ MongoDB Connected");

  app.listen(5000, () => {
    console.log("🚀 Server running on port 5000");
  });
})
.catch((err) => {
  console.log("❌ MongoDB Error:", err.message);
});