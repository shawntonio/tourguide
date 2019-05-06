insert into user_login (username, hash)
values (
    ${username},
    ${hash}
);

insert into users (firstname, lastname, email)
values (
    ${firstname},
    ${lastname},
    ${email}
) returning id;