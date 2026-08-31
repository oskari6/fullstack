const blogsRouter = require("express").Router();
const { Blog } = require("../models");
const { User } = require("../models");
const middleware = require("../utils/middleware");
const { Op } = require("sequelize");

blogsRouter.get("/", async (request, response) => {
  const { search } = request.query;
  const where = search
    ? {
        [Op.or]: [
          { title: { [Op.like]: `%${search}%` } },
          { author: { [Op.like]: `%${search}%` } },
        ],
      }
    : {};

  const blogs = await Blog.findAll({
    where,
    include: {
      model: User,
      attributes: ["id", "name", "username"],
    },
    order: [["likes", "DESC"]],
  });
  response.json(blogs);
});

blogsRouter.get("/:id", async (request, response) => {
  const blog = await Blog.findByPk(request.params.id);
  if (blog) {
    const user = await User.findByPk(blog.userId);
    if (!user) {
      return response.status(400).json("user not found");
    }
    return response.status(200).json({
      ...blog.toJSON(),
      creator: {
        id: user.id,
        name: user.name,
        username: user.username,
      },
    });
  } else {
    return response.status(404).end();
  }
});

blogsRouter.post(
  "/",
  middleware.tokenExtractor,
  middleware.sessionExtractor,
  async (request, response) => {
    const body = request.body;

    if (!body.title || !body.url) {
      return response.status(400).json("Title or url missing");
    }

    const user = await User.findByPk(request.user);
    if (!user) {
      return response.status(400).json("no user found");
    }
    const savedBlog = await Blog.create({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes ?? 0,
      userId: user.id,
      year: body.year,
    });

    return response.status(201).json(savedBlog);
  },
);

blogsRouter.put("/:id", async (request, response, next) => {
  const { title, author, url, likes, year } = request.body;

  const foundBlog = await Blog.findByPk(request.params.id);
  if (!foundBlog) {
    return response.status(404).json("Blog not found").end();
  }

  if (title !== undefined) foundBlog.title = title;
  if (author !== undefined) foundBlog.author = author;
  if (url !== undefined) foundBlog.url = url;
  if (likes !== undefined) foundBlog.likes = likes;
  if (year !== undefined) foundBlog.year = year;

  const updatedBlog = await foundBlog.save();
  if (!updatedBlog) {
    return response.status(500).json("Updating blog failed").end();
  }
  return response.status(200).json(updatedBlog);
});

blogsRouter.delete(
  "/:id",
  middleware.tokenExtractor,
  middleware.sessionExtractor,
  async (request, response) => {
    const foundBlog = await Blog.findByPk(request.params.id);
    if (!foundBlog) {
      return response.status(404).json("Blog not found").end();
    }

    const user = await User.findByPk(request.user);
    if (!user) {
      return response.status(400).json("no user found");
    }

    if (user.id !== foundBlog.userId) {
      return response.status(400).json("user doesnt own blog");
    }
    await foundBlog.destroy();
    return response.status(204).end();
  },
);

module.exports = blogsRouter;
