DROP TABLE IF EXISTS books CASCADE;

CREATE TABLE books (
  book_id     serial PRIMARY KEY,
  title       text,
  description text,
  image       text,
  author      text
);
