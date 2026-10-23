const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0);
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }
  return blogs.reduce((favorite, blog) =>
    blog.likes > favorite.likes ? blog : favorite,
  );
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }

  const counts = {};

  for (const blog of blogs) {
    const author = blog.author;

    if (!counts[author]) {
      counts[author] = {
        author,
        blogs: 0,
      };
    }

    counts[author].blogs++;
  }

  return Object.values(counts).reduce((highest, current) =>
    current.blogs > highest.blogs ? current : highest,
  );
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }

  const counts = {};

  for (const blog of blogs) {
    const author = blog.author;

    if (!counts[author]) {
      counts[author] = {
        author,
        likes: 0,
      };
    }

    counts[author].likes += blog.likes;
  }

  return Object.values(counts).reduce((highest, current) =>
    current.likes > highest.likes ? current : highest,
  );
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
