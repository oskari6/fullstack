CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    author text NOT NULL,
    url text NOT NULL,
    title text NOT NULL,
    likes integer DEFAULT 0
);

INSERT INTO blogs (author, url, title, likes)
VALUES
  ('John Doe', 'localhost', 'First Blog', 5),
  ('Jane Doe', 'localhost', 'Second Blog', 10);