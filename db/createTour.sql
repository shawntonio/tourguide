insert into tour (user_id, name, type, duration, costs, price, difficulty, lat, lng, live)
values (
    ${user_id},
    ${name},
    ${type},
    ${duration},
    ${costs},
    ${price},
    ${difficulty},
    ${lat},
    ${lng},
    false
);