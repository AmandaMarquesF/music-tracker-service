exports.up = function (knex) {
  return knex.schema.createTable("songs", (table) => {
    table.increments("id").primary();
    table.string("title").notNullable();
    table.string("artist").notNullable();
    table.string("composer").notNullable();
    table.integer("year");
    table.string("album").notNullable();
    table.integer("play_count").defaultTo(1);

    table
      .integer("user_id")
      .unsigned()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE")
      .notNullable();

    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("songs");
};
