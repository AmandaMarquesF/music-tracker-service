const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const knex = require("../db/knex");
const saltRounds = 10;

class AuthController {
  static async login(req, res) {
    const { email, password } = req.body;

    console.log("Email:", email);
    console.log("Password:", password);

    try {
      const user = await User.findByEmail(email);
      if (!user) {
        return res.status(401).json({ error: "Invalid email or password" });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        console.log("Password Valid:", isPasswordValid);

        return res.status(401).json({ error: "Invalid email or password" });
      }

      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        {
          expiresIn: process.env.JWT_EXPIRATION,
        }
      );

      res.status(200).json({ token });
    } catch (error) {
      console.error("Login Error:", error);
      res.status(500).json({ error: "Error logging in" });
    }
  }
}

module.exports = AuthController;
