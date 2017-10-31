DROP DATABASE weather;
CREATE DATABASE weather;
\c weather

CREATE TABLE IF NOT EXISTS locations (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL,
    lat integer NOT NULL,
    lon integer NOT NULL
);

CREATE TABLE IF NOT EXISTS users (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(255) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_digest TEXT NOT NULL 
);

CREATE TABLE IF NOT EXISTS usersLocations (
  id SERIAL PRIMARY KEY,
  userid integer NOT NULL,
  locationid integer NOT NULL
);
