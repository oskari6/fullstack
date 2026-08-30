const config = require("./config");
const logger = require("./logger");
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(config.POSTGRES_URI, {
  dialect: "postgres",
  // dialectOptions: {
  //   ssl: {
  //     require: true,
  //     rejectUnauthorized: false,
  //   },
  // },
});

const connect = async () => {
  try {
    logger.info("connecting to", config.POSTGRES_URI);
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

module.exports = { sequelize, connect };
