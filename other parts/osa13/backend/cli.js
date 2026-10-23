require("dotenv").config();
const { Sequelize } = require("sequelize");
const config = require("./utils/config");

const sequelize = new Sequelize(config.POSTGRES_URI, {
  dialect: "postgres",
});

const main = async () => {
  try {
    await sequelize.authenticate();

    const [blogs] = await sequelize.query("SELECT * FROM blogs");

    blogs.forEach((blog) => {
      console.log(`${blog.author}: '${blog.title}', ${blog.likes} likes`);
    });
    sequelize.close();
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

main();
