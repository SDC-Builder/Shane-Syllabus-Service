DROP DATABASE IF EXISTS syllabus_data;
CREATE DATABASE syllabus_data;

\c syllabus_data;

CREATE TABLE IF NOT EXISTS syllabus (
  id int,
  syllabus JSONB
);

