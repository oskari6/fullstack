const { test, after, beforeEach, describe } = require("node:test");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const assert = require("node:assert");
const helper = require("./test_helper");
const Blog = require("../models/blog");

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.initialBlogs);
});

after(async () => {
  await mongoose.connection.close();
});

describe("Blog get operations", () => {
  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("all blogs are returned", async () => {
    const response = await api.get("/api/blogs");
    console.log("res: ", response.body);
    assert.strictEqual(response.body.length, helper.initialBlogs.length);
  });

  test("all blogs have id field instead of _id", async () => {
    const response = await api.get("/api/blogs");
    console.log("res: ", response.body);
    for (let blog of response.body) {
      assert.notEqual(blog.id, null);
      assert.equal(blog._id, null);
    }
  });
});

describe("note inerting, deleting and update operations", () => {
  test("a valid blog can be added ", async () => {
    const newBlog = {
      title: "test2",
      author: "tester2",
      url: "localhost",
      likes: 1,
    };

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1);

    const titles = blogsAtEnd.map((n) => n.title);
    assert(titles.includes("test"));
  });

  test("a blog created without likes default to 0 likes", async () => {
    const newBlog = {
      title: "test2",
      author: "tester2",
      url: "localhost",
    };

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    assert.strictEqual(blogsAtEnd[blogsAtEnd.length - 1].likes, 0);
  });

  test("a blog creates without title or url returns status 400", async () => {
    const newBlogWithoutTitle = {
      author: "tester2",
      url: "localhost",
      likes: 1,
    };
    const newBlogWithoutUrl = {
      title: "test2",
      author: "tester2",
      likes: 1,
    };

    await api
      .post("/api/blogs")
      .send(newBlogWithoutTitle)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    await api
      .post("/api/blogs")
      .send(newBlogWithoutUrl)
      .expect(400)
      .expect("Content-Type", /application\/json/);
  });

  test("updating a blog works", async () => {
    const mockedBlogs = await helper.blogsInDb();

    const blogUpdates = {
      title: "test-update",
      author: "tester-update",
      url: "localhost:8000",
      likes: 2,
    };

    const response = await api
      .put(`/api/blogs/${mockedBlogs[0].id}`)
      .send(blogUpdates)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const updatedBlog = response.body;
    assert.strictEqual(updatedBlog.title, blogUpdates.title);
    assert.strictEqual(updatedBlog.author, blogUpdates.author);
    assert.strictEqual(updatedBlog.url, blogUpdates.url);
    assert.strictEqual(updatedBlog.likes, blogUpdates.likes);
  });

  test("updating a blog with unknown if return 404", async () => {
    const blogUpdates = {
      title: "test-update",
      author: "tester-update",
      url: "localhost:8000",
      likes: 2,
    };

    const response = await api
      .put(`/api/blogs/${new mongoose.Types.ObjectId()}`)
      .send(blogUpdates)
      .expect(404)
      .expect("Content-Type", /application\/json/);
  });

  test("a blog can be deleted", async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart[0];

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

    const blogsAtEnd = await helper.blogsInDb();

    const ids = blogsAtEnd.map((n) => n.id);
    assert(!ids.includes(blogToDelete.id));

    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1);
  });
});
