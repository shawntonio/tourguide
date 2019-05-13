update tour
set type = ${type},
		duration = ${duration},
		costs = ${costs},
		price = ${price},
		difficulty = ${difficulty},
		live = true
where id = ${id};