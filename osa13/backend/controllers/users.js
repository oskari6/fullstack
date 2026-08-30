const usersRouter = require("express").Router();
const { User, Blog } = require("../models");
const { Op } = require("sequelize");

usersRouter.get("/", async (request, response) => {
  const users = await User.findAll({
    include: {
      model: Blog,
    },
  });
  response.json(users);
});

usersRouter.post("/", async (request, response) => {
  const { username, name } = request.body;

  const user = await User.create({
    username,
    name,
  });

  return response.status(201).json(user);
});

usersRouter.put("/:username", async (request, response, next) => {
  const { name, username } = request.body;

  const foundUser = await User.findByPk(request.params.username);
  if (!foundUser) {
    return response.status(404).json("user not found").end();
  }

  foundUser.name = name;
  foundUser.username = username;

  const updatedUser = await foundUser.save();
  if (!updatedUser) {
    return response.status(500).json("Updating user failed").end();
  }
  return response.status(200).json(updatedUser);
});

module.exports = usersRouter;
