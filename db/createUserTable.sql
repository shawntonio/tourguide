create table users (
    id serial primary key,
    firstname varchar not null,
    lastname varchar not null,
    email varchar not null
);

create table user_login (
    id serial primary key,
    username varchar not null,
    hash text not null
);