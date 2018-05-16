DROP DATABASE IF EXISTS devInterviews_db;
CREATE DATABASE devInterviews_db;

/c devInterviews_db;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  username TEXT NOT NULL,
  hashword TEXT NOT NULL,
  email TEXT NOT NULL
);

DROP TABLE IF EXISTS interviews;

CREATE TABLE interviews (
  id SERIAL PRIMARY KEY NOT NULL,
  title TEXT NOT NULL,
  position TEXT NOT NULL
);

DROP TABLE IF EXISTS questions;

CREATE TABLE questions (
  interview_id INTEGER,
  
)
