-- init.sql

CREATE TABLE IF NOT EXISTS duties (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    done BOOLEAN,
    deleted BOOLEAN
);