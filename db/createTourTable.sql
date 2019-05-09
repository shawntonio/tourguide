create table tour (
    id serial primary key,
    user_id int references users,
    name varchar not null,
    type varchar,
    duration varchar,
    costs float,
    price float,
    difficulty varchar,
    lat float,
    lng float,
    live boolean
);

create table content (
    id serial primary key,
    tour_id int references tour,
    url text,
    lat float,
    lng float
);