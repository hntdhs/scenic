CREATE TABLE users (
  username VARCHAR(25) PRIMARY KEY,
  password TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL
    CHECK (position('@' IN email) > 1),
  bio TEXT,
  user_location TEXT,
  favorite_state TEXT,
  profile_photo TEXT,
  is_admin BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE byways (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    state TEXT NOT NULL,
    length TEXT NOT NULL,
    designation TEXT NOT NULL,
    fees TEXT NOT NULL,
    image TEXT NOT NULL,
    description TEXT NOT NULL,
    geographic_features TEXT
);

CREATE TABLE states (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  nickname TEXT NOT NULL,
  image TEXT NOT NULL
);

CREATE TABLE comments (
  id SERIAL PRIMARY KEY,
  username REFERENCES users ON DELETE CASCADE,
  byway_name REFERENCES byways ON DELETE CASCADE, 
  date_and_time TIMESTAMP NOT NULL,
  comment TEXT NOT NULL
);