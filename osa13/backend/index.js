const app = require("./app"); // varsinainen Express-sovellus
const config = require("./utils/config");
const logger = require("./utils/logger");
const { connect, sequelize } = require("./utils/db");

const start = async () => {
  await connect();
  await sequelize.sync({ alter: config.isTesting });

  app.listen(config.PORT, () => {
    logger.info(`Server running on port ${config.PORT}`);
  });
};

start().catch((error) => {
  logger.error("Unable to start application", error);
  process.exit(1);
});
