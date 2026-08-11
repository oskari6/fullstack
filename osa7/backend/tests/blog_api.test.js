const { test, after, beforeEach, describe } = require("node:test");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const assert = require("node:assert");
const helper = require("./test_helper");
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  await User.deleteMany({});
  const users = await User.insertMany(helper.initialUsers);

  const blogs = helper.initialBlogs.map((blog) => ({
    ...blog,
    creator: users[0].id, // or whichever user you want
  }));

  await Blog.insertMany(blogs);
});

after(async () => {
  await mongoose.connection.close();
});

describe("Blog get operations", () => {
  const token = jwt.sign(
    { id: new mongoose.Types.ObjectId().toString() },
    process.env.SECRET,
  );
  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .set("Authorization", `Bearer ${token}`)
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("all blogs are returned", async () => {
    const token = jwt.sign(
      { id: new mongoose.Types.ObjectId().toString() },
      process.env.SECRET,
    );
    const response = await api
      .get("/api/blogs")
      .set("Authorization", `Bearer ${token}`);
    console.log("res: ", response.body);
    assert.strictEqual(response.body.length, helper.initialBlogs.length);
  });

  test("all blogs have id field instead of _id", async () => {
    const token = jwt.sign(
      { id: new mongoose.Types.ObjectId().toString() },
      process.env.SECRET,
    );
    const response = await api
      .get("/api/blogs")
      .set("Authorization", `Bearer ${token}`);
    console.log("res: ", response.body);
    for (let blog of response.body) {
      assert.notEqual(blog.id, null);
      assert.equal(blog._id, null);
    }
  });
});

describe("blog inserting, deleting and update operations", () => {
  test("a valid blog can be added ", async () => {
    const mockedUsers = await helper.usersInDb();
    const newBlog = {
      title: "test2",
      author: "tester2",
      url: "localhost",
      likes: 1,
      creator: mockedUsers[0].id,
    };
    const token = jwt.sign(
      { id: mockedUsers[0].id.toString() },
      process.env.SECRET,
    );

    await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1);

    const titles = blogsAtEnd.map((n) => n.title);
    assert(titles.includes("test"));
  });

  test("a blog created without likes default to 0 likes", async () => {
    const mockedUsers = await helper.usersInDb();
    const newBlog = {
      title: "test2",
      author: "tester2",
      url: "localhost",
      creator: mockedUsers[0].id,
    };
    const token = jwt.sign(
      { id: mockedUsers[0].id.toString() },
      process.env.SECRET,
    );
    await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${token}`)
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
      creator: new mongoose.Types.ObjectId(),
    };
    const newBlogWithoutUrl = {
      title: "test2",
      author: "tester2",
      likes: 1,
      creator: new mongoose.Types.ObjectId(),
    };
    const token = jwt.sign(
      { id: newBlogWithoutTitle.creator.toString() },
      process.env.SECRET,
    );
    await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${token}`)
      .send(newBlogWithoutTitle)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${token}`)
      .send(newBlogWithoutUrl)
      .expect(400)
      .expect("Content-Type", /application\/json/);
  });
  test("creating blog without user in token returns 401", async () => {
    const newBlog = {
      title: "test",
      author: "tester2",
      url: "localhost",
      likes: 1,
      creator: new mongoose.Types.ObjectId(),
    };
    const token = jwt.sign(
      { id: newBlog.creator.toString() },
      process.env.SECRET,
    );
    await api
      .post("/api/blogs")
      .set("Authorization", "Bearer ")
      .send(newBlog)
      .expect(401)
      .expect("Content-Type", /application\/json/);
  });

  test("updating a blog works", async () => {
    const mockedBlogs = await helper.blogsInDb();

    const blogUpdates = {
      title: "test-update",
      author: "tester-update",
      url: "localhost:8000",
      likes: 2,
      creator: new mongoose.Types.ObjectId(),
    };
    const token = jwt.sign(
      { id: mockedBlogs[0].creator.toString() },
      process.env.SECRET,
    );
    const response = await api
      .put(`/api/blogs/${mockedBlogs[0].id}`)
      .set("Authorization", `Bearer ${token}`)
      .send(blogUpdates)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const updatedBlog = response.body;
    assert.strictEqual(updatedBlog.title, blogUpdates.title);
    assert.strictEqual(updatedBlog.author, blogUpdates.author);
    assert.strictEqual(updatedBlog.url, blogUpdates.url);
    assert.strictEqual(updatedBlog.likes, blogUpdates.likes);
  });

  test("updating a blog with unknown id returns 404", async () => {
    const blogUpdates = {
      title: "test-update",
      author: "tester-update",
      url: "localhost:8000",
      likes: 2,
      creator: new mongoose.Types.ObjectId(),
    };
    const token = jwt.sign(
      { id: blogUpdates.creator.toString() },
      process.env.SECRET,
    );
    const response = await api
      .put(`/api/blogs/${new mongoose.Types.ObjectId()}`)
      .set("Authorization", `Bearer ${token}`)
      .send(blogUpdates)
      .expect(404)
      .expect("Content-Type", /application\/json/);
  });

  test("a blog can be deleted", async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart[0];
    const token = jwt.sign(
      { id: blogToDelete.creator.toString() },
      process.env.SECRET,
    );
    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(204);

    const blogsAtEnd = await helper.blogsInDb();

    const ids = blogsAtEnd.map((n) => n.id);
    assert(!ids.includes(blogToDelete.id));

    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1);
  });
});
