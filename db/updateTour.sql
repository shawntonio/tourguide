update tour
set type = ${type},
		duration = ${duration},
		costs = ${costs},
		price = ${price},
		difficulty = ${difficulty},
		live = ${live},
		cover_photo = ${cover_photo}
where id = ${id};