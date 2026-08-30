const usersRouter = require("express").Router();
const { User, Blog } = require("../models");
const bcrypt = require("bcrypt");

usersRouter.get("/", async (request, response) => {
  const users = await User.findAll({
    include: {
      model: Blog,
    },
  });
  response.json(users);
});

usersRouter.get("/:id", async (request, response) => {
  const { read } = request.query;
  const where =
    read !== undefined
      ? {
          read: read === "true",
        }
      : {};

  const foundUser = await User.findByPk(request.params.id, {
    attributes: ["name", "username"],
    include: {
      model: Blog,
      as: "readings",
      attributes: ["id", "url", "title", "author", "likes", "year"],
      through: {
        attributes: ["read", "id"],
        where,
      },
    },
  });

  if (!foundUser) {
    return response.status(404).json({ error: "no user found" });
  }

  return response.status(200).json(foundUser);
});

usersRouter.post("/", async (request, response) => {
  const { username, name, password } = request.body;

  if (!password || password.length < 3) {
    return response.status(400).json({
      error: "password must be at least 3 characters long",
    });
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const user = await User.create({
    username,
    name,
    passwordHash,
  });

  return response.status(201).json({
    id: user.id,
    username: user.username,
    name: user.name,
  });
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
