const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const knex = require("../db/knex");
const saltRounds = 10;

class UserController {
  static async register(req, res) {
    const { first_name, last_name, email, gender, birthdate, password } =
      req.body;

    try {
      const existingUser = await knex("users").where({ email }).first();
      if (existingUser) {
        return res.status(400).json({ error: "Email already in use" });
      }

      const hashedPassword = await bcrypt.hash(password, saltRounds);

      await knex("users").insert({
        first_name,
        last_name,
        email,
        gender,
        birthdate,
        password: hashedPassword,
      });

      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      res.status(500).json({ error: "Error registering user" });
    }
  }

  static async listUsers(req, res) {
    try {
      const users = await knex("users").select("*");
      res.status(200).json(users);
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ error: "Error fetching users" });
    }
  }

  static async updateUser(req, res) {
    const { id } = req.params;
    const { first_name, last_name, email, gender, birthdate, password } =
      req.body;

    try {
      const existingUser = await knex("users").where({ id }).first();
      if (!existingUser) {
        return res.status(404).json({ error: "User not found" });
      }

      const updates = { first_name, last_name, email, gender, birthdate };

      // Atualizar senha se for fornecida
      if (password) {
        updates.password = await bcrypt.hash(password, saltRounds);
      }

      await knex("users").where({ id }).update(updates);
      res.status(200).json({ message: "User updated successfully" });
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).json({ error: "Error updating user" });
    }
  }

  static async deleteUser(req, res) {
    const { id } = req.params;

    try {
      const existingUser = await knex("users").where({ id }).first();
      if (!existingUser) {
        return res.status(404).json({ error: "User not found" });
      }

      await knex("users").where({ id }).del();
      res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      console.error("Error deleting user:", error);
      res.status(500).json({ error: "Error deleting user" });
    }
  }
}

module.exports = UserController;
