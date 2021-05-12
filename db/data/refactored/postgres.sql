DROP TABLE IF EXISTS syllabus;
DROP DATABASE IF EXISTS syllabus_data;
CREATE DATABASE syllabus_data;

CREATE TABLE IF NOT EXISTS syllabus (
  id int PRIMARY KEY,
  syllabus JSONB
);

