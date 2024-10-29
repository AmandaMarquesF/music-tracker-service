const knex = require("../db/knex");

class Music {
  static async create(songData) {
    return await knex("songs").insert(songData).returning("*");
  }

  static async getMostPlayed(userId, period) {
    let query = knex("songs").where("user_id", userId);

    if (period === "last_week") {
      query = query.where(
        "created_at",
        ">=",
        knex.raw("NOW() - INTERVAL '7 days'")
      );
    } else if (period === "last_month") {
      query = query.where(
        "created_at",
        ">=",
        knex.raw("NOW() - INTERVAL '1 month'")
      );
    } else if (period === "all_time") {
    }

    return await query.orderBy("play_count", "desc").limit(10);
  }
}

module.exports = Music;
