delete from content
where id = ${id}
returning *;