const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogsRouter.post("/", async (request, response) => {
  const body = request.body;

  if (!body.title || !body.url) {
    response.status(400).json("Title or url missing");
  }

  const blog = new Blog({
    content: body.content,
    important: body.important || false,
  });

  const savedBlog = await blog.save();
  response.status(201).json(savedBlog);
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
  response.status(200).json(foundBlog);
});

blogsRouter.delete("/:id", async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id);
  response.status(204).end();
});

module.exports = blogsRouter;
