DROP DATABASE IF EXISTS notes;
CREATE DATABASE notes;

CREATE TABLE notes (
  ID SERIAL PRIMARY KEY,
  description VARCHAR
);

INSERT INTO notes (description)
  VALUES ('This is my first note.');
