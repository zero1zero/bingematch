-- liquibase formatted sql

-- changeset zack:1
create table users (
    id char(8) PRIMARY KEY,
    email varchar(255) NOT NULL,
    first varchar(64) NOT NULL,
    last varchar(64) NOT NULL,

    hash varchar(60) NOT NULL,

    genres JSONB NOT NULL DEFAULT '[]',

    created TIMESTAMP NOT NULL DEFAULT current_timestamp
);
CREATE INDEX hash_index ON users (hash);
CREATE INDEX user_genre ON users (genres);

create table shows (
    id char(9) PRIMARY KEY,

    tmdb JSONB NOT NULL,

    created TIMESTAMP NOT NULL DEFAULT current_timestamp,
    updated TIMESTAMP NOT NULL DEFAULT current_timestamp
);
CREATE INDEX tmdb_id ON shows ((tmdb->>'id'));

create table queue (
    id char(8) PRIMARY KEY,

    user_id char(8) NOT NULL,
    show_id char(9) NOT NULL,

    state integer NOT NULL,

    created TIMESTAMP NOT NULL DEFAULT current_timestamp
);

CREATE INDEX queue_user ON queue (user_id);
CREATE INDEX queue_show ON queue (show_id);
CREATE INDEX queue_state ON queue (state);

create table catalog_sync (
    last TIMESTAMP NOT NULL,
    count integer NOT NULL
);
