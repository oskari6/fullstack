const blogs = [
  {
    id: 1,
    title: "test",
    author: "tester",
    url: "localhost",
    likes: 1,
  },
  {
    id: 2,

    title: "test2",
    author: "tester",
    url: "localhost",
    likes: 1,
  },
];

let nextId = 3;

export const getBlogs = () => {
  return blogs.sort((a, b) => b.likes - a.likes);
};

export const addBlog = (title: string, author: string, url: string) => {
  blogs.push({ id: nextId++, title, author, url, likes: 0 });
};

export const getBlogById = (id: number) => {
  return blogs.find((blog) => blog.id === id);
};

export const likeBlog = (id: number) => {
  const blog = blogs.find((blog) => blog.id === id);
  if (blog) {
    blog.likes = blog.likes + 1;
  }
};
