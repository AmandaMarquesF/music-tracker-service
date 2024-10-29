const knex = require("../db/knex");

class User {
  static async findByEmail(email) {
    return await knex("users").where({ email }).first();
  }
}

module.exports = User;
