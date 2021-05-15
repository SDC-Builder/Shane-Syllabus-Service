DROP DATABASE IF EXISTS jest;
CREATE DATABASE jest;

\c jest;

CREATE TABLE IF NOT EXISTS syllabus (
  id int,
  syllabus JSONB
);
