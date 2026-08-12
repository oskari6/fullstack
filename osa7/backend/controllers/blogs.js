const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const middleware = require("../utils/middleware");

blogsRouter.get("/", async (request, response) => {
    const blogs = await Blog.find({}).populate("creator", {
        username: 1,
        name: 1,
        id: 1
    });
    response.json(blogs);
});

blogsRouter.get("/:id", async (request, response) => {
    const blog = await Blog.findById(request.params.id);
    if (blog) {
        const user = await User.findById(blog.creator);
        if (!user) {
            return response.status(400).json("user not found");
        }
        return response.status(200).json({
            ...blog.toJSON(),
            creator: {
                id: user._id,
                name: user.name,
                username: user.username
            }
        });
    } else {
        return response.status(404).end();
    }
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
        creator: user._id
    });

    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();

    return response.status(201).json({
        ...savedBlog.toJSON(),
        creator: {
            id: user._id,
            name: user.name,
            username: user.username
        }
    });
});

blogsRouter.put("/:id", middleware.userExtractor, async (request, response, next) => {
    const { title, author, url, likes, comments } = request.body;

    const foundBlog = await Blog.findById(request.params.id);
    if (!foundBlog) {
        return response.status(404).json("Blog not found").end();
    }

    foundBlog.title = title;
    foundBlog.author = author;
    foundBlog.url = url;
    foundBlog.likes = likes;
    foundBlog.comments = comments;

    const updatedBlog = await foundBlog.save();
    if (!updatedBlog) {
        return response.status(500).json("Updating blog failed").end();
    }

    const user = await User.findById(request.user);
    if (!user) {
        return response.status(400).json("user not found");
    }

    return response.status(200).json({
        ...updatedBlog.toJSON(),
        creator: {
            id: user._id,
            name: user.name,
            username: user.username
        }
    });
});

blogsRouter.delete("/:id", middleware.userExtractor, async (request, response) => {
    const foundBlog = await Blog.findById(request.params.id);
    if (!foundBlog) {
        return response.status(404).json("Blog not found").end();
    }

    if (!foundBlog.creator.equals(request.user)) {
        return response.status(400).json("Unauhtorized user can't delete token").end();
    }

    await Blog.findByIdAndDelete(request.params.id);
    return response.status(204).end();
});

module.exports = blogsRouter;
