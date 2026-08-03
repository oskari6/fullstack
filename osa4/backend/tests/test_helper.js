const Note = require("../models/note");
const Blog = require("../models/blog");

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

const initialBlogs = [
  {
    title: "test",
    author: "tester",
    url: "localhost",
    likes: 1,
  },
  {
    title: "test",
    author: "tester",
    url: "localhost",
    likes: 1,
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

module.exports = {
  initialNotes,
  initialBlogs,
  nonExistingId,
  notesInDb,
  blogsInDb,
};
