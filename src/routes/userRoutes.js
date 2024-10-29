const express = require("express");
const router = express.Router();
const knex = require("../db/knex");

const UserController = require("../controllers/userController");

router.post("/users/register", UserController.register);
router.get("/users", UserController.listUsers);
router.put("/users/:id", UserController.updateUser);
router.delete("/users/:id", UserController.deleteUser);

module.exports = router;
