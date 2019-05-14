select * from tour_paid_for p
join tour t on t.id = p.tour_id
where p.user_id = ${user_id};