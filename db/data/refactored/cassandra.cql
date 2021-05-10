-- DROP KEYSPACE IF EXISTS syllabus_data;

CREATE KEYSPACE IF NOT EXISTS syllabus_data
WITH REPLICATION = { 'class': 'SimpleStrategy', 'replication_factor': 2};

USE syllabus_data;

CREATE TABLE IF NOT EXISTS syllabus (
  id int PRIMARY KEY,
  syllabus varchar,
);
