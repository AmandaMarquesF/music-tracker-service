require("dotenv").config();

module.exports = {
  development: {
    client: "pg",
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT,
    },
    migrations: {
      directory: "./migrations",
    },
    seeds: {
      directory: "./seeds",
    },
  },
  test: {
    client: "pg",
    connection: {
      host: process.env.DB_TEST_HOST,
      user: process.env.DB_TEST_USER,
      password: process.env.DB_TEST_PASSWORD,
      database: process.env.DB_TEST_NAME,
      port: process.env.DB_TEST_PORT,
    },
    migrations: {
      directory: "./migrations",
    },
    seeds: {
      directory: "./seeds",
    },
  },
};
