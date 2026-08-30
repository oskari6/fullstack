require("dotenv").config();

const PORT = process.env.PORT;
const POSTGRES_URI = process.env.POSTGRES_URI;
const TEST_DATABASE_URL = process.env.TEST_DATABASE_URL;
const isTesting =
  process.env.TESTING === "true" || process.env.NODE_ENV === "test";

const databaseUrl = isTesting ? TEST_DATABASE_URL : POSTGRES_URI;

module.exports = {
  POSTGRES_URI: databaseUrl,
  PORT: PORT || 3001
};
