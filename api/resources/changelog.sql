-- liquibase formatted sql

-- changeset zack:1
create table users (
    id char(8) PRIMARY KEY,
    email varchar(255) NOT NULL,
    first varchar(64) NOT NULL,
    last varchar(64) NOT NULL,

    hash varchar(60) NOT NULL,

    genres JSONB NOT NULL DEFAULT '[]',

    queued JSONB NOT NULL DEFAULT '[]',
    liked JSONB NOT NULL DEFAULT '[]',
    disliked JSONB NOT NULL DEFAULT '[]',
    matched JSONB NOT NULL DEFAULT '[]',
    watched JSONB NOT NULL DEFAULT '[]',

    created TIMESTAMP NOT NULL DEFAULT current_timestamp
);
CREATE INDEX hash_index ON users (hash);
CREATE INDEX user_genre ON users (genres);
-- CREATE INDEX users_queued_show ON users((queued->>'show'));
-- CREATE INDEX users_liked_show ON users((liked->>'show'));
-- CREATE INDEX users_disliked_show ON users((disliked->>'show'));
-- CREATE INDEX users_matched_show ON users((matched->>'show'));
-- CREATE INDEX users_matched_user ON users((matched->>'user'));
-- CREATE INDEX users_watched_show ON users((watched->>'show'));

create table if not exists shows (
    id char(9) PRIMARY KEY,

    tmdb JSONB NOT NULL,

    created TIMESTAMP NOT NULL DEFAULT current_timestamp,
    updated TIMESTAMP NOT NULL DEFAULT current_timestamp
);
CREATE INDEX IF NOT EXISTS tmdb_id ON shows ((tmdb->>'id'));

create table catalog_sync (
    last TIMESTAMP NOT NULL,
    count integer NOT NULL
);
