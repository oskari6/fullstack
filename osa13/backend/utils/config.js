require("dotenv").config();

const PORT = process.env.PORT;
const POSTGRES_URI = process.env.POSTGRES_URI;
const TEST_DATABASE_URL = process.env.TEST_DATABASE_URL;
const isTesting = Boolean(process.env.TESTING);

module.exports = {
  POSTGRES_URI: isTesting ? TEST_DATABASE_URL : POSTGRES_URI,
  PORT,
};
