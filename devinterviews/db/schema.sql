\c devInterviews_db

DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  name TEXT NOT NULL,
  username TEXT NOT NULL,
  hashword TEXT NOT NULL,
  email TEXT NOT NULL
);

DROP TABLE IF EXISTS interviews;

CREATE TABLE interviews (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER,
  title TEXT NOT NULL,
  username TEXT NOT NULL,
  position TEXT NOT NULL,
  industry TEXT NOT NULL,
  summary TEXT NOT NULL,
  score INTEGER,
  post_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS questions;

CREATE TABLE questions (
  id SERIAL PRIMARY KEY NOT NULL,
  username TEXT NOT NULL,
  interview_id INTEGER,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  score INTEGER DEFAULT '0',
  tags INTEGER
);

DROP TABLE IF EXISTS interview_comments;

CREATE TABLE interview_comments (
  id SERIAL PRIMARY KEY NOT NULL,
  interview_id INTEGER,
  user_id INTEGER,
  username TEXT NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  score INTEGER DEFAULT '0',
  post_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS question_comments;

CREATE TABLE question_comments (
  id SERIAL PRIMARY KEY NOT NULL,
  question_id INTEGER,
  user_id INTEGER,
  username TEXT NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  score INTEGER DEFAULT '0',
  post_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS users_interviews;

CREATE TABLE users_interviews (
  user_id INTEGER,
  interview_id INTEGER
);

DROP TABLE IF EXISTS tags;

CREATE TABLE tags (
  id SERIAL PRIMARY KEY NOT NULL,
  name  TEXT UNIQUE NOT NULL,
  score INTEGER DEFAULT '0'
);

DROP TABLE IF EXISTS interviews_tags;

CREATE TABLE interviews_tags (
  interview_id INTEGER,
  tag_id INTEGER
);

DROP TABLE IF EXISTS questions_tags;

CREATE TABLE questions_tags (
question_id INTEGER,
tag_id INTEGER
);

DROP TABLE IF EXISTS vote_tracker;

CREATE TABLE vote_tracker (
user_id INTEGER,
type TEXT NOT NULL,
type_id INTEGER,
amount INTEGER
);
