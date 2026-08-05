const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const middleware = require("../utils/middleware");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("creator", {
    username: 1,
    name: 1,
    id: 1,
  });
  response.json(blogs);
});

blogsRouter.post("/", middleware.userExtractor, async (request, response) => {
  const body = request.body;

  if (!body.title || !body.url) {
    return response.status(400).json("Title or url missing");
  }

  const user = await User.findById(request.user);
  if (!user) {
    return response.status(400).json("user not found");
  }
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes ?? 0,
    creator: user._id,
  });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  return response.status(201).json(savedBlog);
});

blogsRouter.put("/:id", async (request, response, next) => {
  const { title, author, url, likes } = request.body;

  const foundBlog = await Blog.findById(request.params.id);
  if (!foundBlog) {
    return response.status(404).json("Blog not found").end();
  }

  foundBlog.title = title;
  foundBlog.author = author;
  foundBlog.url = url;
  foundBlog.likes = likes;

  const updatedBlog = await foundBlog.save();
  if (!updatedBlog) {
    return response.status(500).json("Updating blog failed").end();
  }
  return response.status(200).json(foundBlog);
});

blogsRouter.delete("/:id", async (request, response) => {
  const foundBlog = await Blog.findById(request.params.id);
  if (!foundBlog) {
    return response.status(404).json("Blog not found").end();
  }

  if (foundBlog.creator.toString() !== request.user.toString()) {
    return response
      .status(400)
      .json("Unauhtorized user can't delete token")
      .end();
  }

  await Blog.findByIdAndDelete(request.params.id);
  return response.status(204).end();
});

module.exports = blogsRouter;
