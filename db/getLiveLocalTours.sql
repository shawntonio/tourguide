select * from tour
where live = true
and lat > ${latN} and lat < ${latP}
and lng > ${lngN} and lng < ${lngP};