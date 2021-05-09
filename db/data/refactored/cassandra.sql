CREATE KEYSPACE IF NOT EXISTS syllabus
WITH REPLICATION = { 'class': 'SimpleStrategy', 'replication_factor': 3};

CREATE TABLE IF NOT EXISTS syllabus.test (
  id int,
  fName text,
  PRIMARY KEY (id),
);
