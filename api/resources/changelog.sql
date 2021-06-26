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

