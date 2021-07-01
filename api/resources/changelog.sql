-- liquibase formatted sql

-- changeset zack:1
select 1;

-- changeset zack:2
create table users (
    id varchar(16) PRIMARY KEY,
    email varchar(255) NOT NULL,
    first varchar(64) NOT NULL,
    last varchar(64) NOT NULL,

    hash varchar(60) NOT NULL,

    created TIMESTAMP NOT NULL DEFAULT current_timestamp,

    CONSTRAINT unique_email UNIQUE(email)
);
CREATE INDEX hash_index ON users (hash);

-- changeset zack:3
create table shows (
      id varchar(16) PRIMARY KEY,

      tmdb JSON NOT NULL,

      created TIMESTAMP NOT NULL DEFAULT current_timestamp,
      updated TIMESTAMP NOT NULL DEFAULT current_timestamp
);

CREATE INDEX tmdb_id ON shows((tmdb->>'id'));

create table catalog_sync (
    last TIMESTAMP NOT NULL,
    count integer NOT NULL
)
