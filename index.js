require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to Music Tracker Service API");
});

const authRoutes = require("./src/routes/authRoutes");
app.use("/api/auth", authRoutes);

const userRoutes = require("./src/routes/userRoutes");
app.use("/api", userRoutes);

const songRoutes = require("./src/routes/songsRoutes");
app.use("/api", songRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

module.exports = app;
