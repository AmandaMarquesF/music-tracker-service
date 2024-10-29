const Song = require("../models/songModel");

class SongController {
  static async register(req, res) {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    const { title, artist, composer, year, album } = req.body;

    if (!title || !artist || !composer || !year || !album) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const userId = req.user.id;

    try {
      const newSong = await Song.create({
        title,
        artist,
        composer,
        year,
        album,
        user_id: userId,
      });
      res.status(201).json(newSong);
    } catch (error) {
      console.log("Error:", error);

      res.status(500).json({ error: "Error registering song" });
    }
  }

  static async getMostPlayed(req, res) {
    const userId = req.user.id;
    const { period } = req.query;

    try {
      const songs = await Song.getMostPlayed(userId, period);
      res.status(200).json(songs);
    } catch (error) {
      res.status(500).json({ error: "Error fetching most played songs" });
    }
  }
}

module.exports = SongController;
