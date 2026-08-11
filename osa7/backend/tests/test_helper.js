const Note = require("../models/note");
const Blog = require("../models/blog");
const User = require("../models/user");
const mongoose = require("mongoose");

const initialNotes = [
  {
    content: "HTML is easy",
    important: false,
  },
  {
    content: "Browser can execute only JavaScript",
    important: true,
  },
];

const initialUsers = [
  { username: "test2", name: "test2", passwordHash: "123", blogs: [] },
];

const initialBlogs = [
  {
    title: "test",
    author: "tester",
    url: "localhost",
    likes: 1,
    creator: new mongoose.Types.ObjectId(),
  },
  {
    title: "test",
    author: "tester",
    url: "localhost",
    likes: 1,
    creator: new mongoose.Types.ObjectId(),
  },
];

const nonExistingId = async () => {
  const note = new Note({ content: "willremovethissoon" });
  await note.save();
  await note.deleteOne();

  return note._id.toString();
};

const notesInDb = async () => {
  const notes = await Note.find({});
  return notes.map((note) => note.toJSON());
};

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((u) => u.toJSON());
};

module.exports = {
  initialNotes,
  initialBlogs,
  initialUsers,
  nonExistingId,
  notesInDb,
  blogsInDb,
  usersInDb,
};
