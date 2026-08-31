const express = require("express");
require("dotenv").config();
const middleware = require("./utils/middleware");
const blogsRouter = require("./controllers/blogs");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const readingListsRouter = require("./controllers/reading_lists");
const { Sequelize } = require("sequelize");
const { Blog, User, ReadingListEntry, Session } = require("./models");

const app = express();

app.use(express.static("dist"));
app.use(express.json());
app.use(middleware.requestLogger);
app.use(middleware.tokenExtractor);

app.use("/api/blogs", blogsRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);
app.use("/api/readinglists", readingListsRouter);
app.delete(
  "/api/logout",
  middleware.tokenExtractor,
  middleware.sessionExtractor,
  async (request, response) => {
    const user = await User.findByPk(request.user);
    if (!user) {
      return response.status(400).json("no user found");
    }

    await Session.destroy({ where: { userId: request.user } });
    return response.status(204).end();
  },
);
app.get("/api/authors", async (request, response) => {
  const authors = await Blog.findAll({
    attributes: [
      "author",
      [Sequelize.fn("COUNT", Sequelize.col("id")), "blogs"],
      [Sequelize.fn("SUM", Sequelize.col("likes")), "likes"],
    ],
    group: ["author"],
    order: [["likes", "DESC"]],
  });

  return response.json(authors);
});
app.post("/api/reset", async (request, response) => {
  await Session.destroy({ truncate: true, cascade: true });
  await ReadingListEntry.destroy({ truncate: true, cascade: true });
  await Blog.destroy({ truncate: true, cascade: true });
  await User.destroy({ truncate: true, cascade: true });
  return response.status(204).end();
});
app.get("/", (request, response) => {
  return response.sendStatus(200);
});

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
