const blogsRouter = require("express").Router();
const { Blog, ReadingListEntry } = require("../models");
const { User } = require("../models");
const middleware = require("../utils/middleware");

readingListsRouter.post(
  "/",
  middleware.tokenExtractor,
  middleware.sessionExtractor,
  async (request, response) => {
    const body = request.body;

    if (!body.blogId || !body.userId) {
      return response.status(400).json("blog or user id missing");
    }

    const user = await User.findByPk(request.user);
    if (!user) {
      return response.status(400).json("no user found");
    }

    const foundBlog = await Blog.findByPk(body.blogId);
    if (!foundBlog) {
      return response.status(400).json("no blog found");
    }
    const savedReadingListEntry = await ReadingListEntry.create({
      blogId: body.blogId,
      userId: body.userId,
    });

    return response.status(201).json(savedReadingListEntry);
  },
);

readingListsRouter.put(
  "/:id",
  middleware.tokenExtractor,
  middleware.sessionExtractor,
  async (request, response, next) => {
    const { read } = request.body;

    const user = await User.findByPk(request.user);
    if (!user) {
      return response.status(400).json("no user found");
    }

    const foundReadinListEntry = await ReadingListEntry.findByPk(
      request.params.id,
    );
    if (!foundReadinListEntry) {
      return response.status(404).json("reading list item not found").end();
    }

    if (read !== undefined) foundReadinListEntry.read = read;

    const updatedReadinListEntry = await foundReadinListEntry.save();
    if (!updatedReadinListEntry) {
      return response
        .status(500)
        .json("Updating reading list item failed")
        .end();
    }
    return response.status(200).json(updatedReadinListEntry);
  },
);

module.exports = blogsRouter;
