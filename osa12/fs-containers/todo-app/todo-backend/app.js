const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const { get } = require("./redis");

const indexRouter = require("./routes/index");
const todosRouter = require("./routes/todos");

const app = express();

app.use(cors());

app.use(logger("dev"));
app.use(express.json());

app.use("/", indexRouter);
app.use("/todos", todosRouter);
app.get("/statistics", async (_req, res) => {
  const count = await get("added_todos");
  res.json({
    added_todos: Number(count || 0),
  });
});
module.exports = app;
