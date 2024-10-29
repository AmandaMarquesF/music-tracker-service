const express = require("express");
const router = express.Router();

const SongController = require("../controllers/songController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/songs", authMiddleware, SongController.register);
router.get("/songs/most-played", authMiddleware, SongController.getMostPlayed);

module.exports = router;
