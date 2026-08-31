const readingListsRouter = require("express").Router();
const { Blog, ReadingListEntry } = require("../models");
const { User } = require("../models");
const middleware = require("../utils/middleware");

readingListsRouter.post(
  "/",
  async (request, response) => {
    const body = request.body;

    if (!body.blogId || !body.userId) {
      return response.status(400).json("blog or user id missing");
    }

    const user = await User.findByPk(body.userId);
    if (!user) {
      return response.status(404).json("no user found");
    }

    const foundBlog = await Blog.findByPk(body.blogId);
    if (!foundBlog) {
      return response.status(404).json("no blog found");
    }
    const existingEntry = await ReadingListEntry.findOne({
      where: { blogId: body.blogId, userId: body.userId },
    });
    if (existingEntry) {
      return response.status(400).json("blog is already in the reading list");
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

    const foundReadingListEntry = await ReadingListEntry.findByPk(
      request.params.id,
    );
    if (!foundReadingListEntry) {
      return response.status(404).json("reading list item not found").end();
    }

    if (foundReadingListEntry.userId !== user.id) {
      return response.status(401).json("reading list item belongs to another user");
    }

    if (read !== undefined) foundReadingListEntry.read = read;

    const updatedReadingListEntry = await foundReadingListEntry.save();
    if (!updatedReadingListEntry) {
      return response
        .status(500)
        .json("Updating reading list item failed")
        .end();
    }
    return response.status(200).json(updatedReadingListEntry);
  },
);

module.exports = readingListsRouter;
