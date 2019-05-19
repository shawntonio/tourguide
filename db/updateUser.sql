update users
set firstname = ${firstname},
    lastname = ${lastname},
		email = ${email},
		profile_pic = ${profile_pic}
where id = ${id};
