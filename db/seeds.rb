require 'csv'

alums = []

CSV.foreach("db/gsheet18052016.csv") do |row|
  alums << row
end

Bootcamp.create(name:"DBC")
Bootcamp.create(name:"Hackbright")

alums.each do |alum|

	if alum[6] == "DBC"
		id = 1
	else
		id = 2
	end

	Alum.create(name:alum[0],company:alum[1],compurl:alum[2],city:alum[3],state:alum[4],linkurl:alum[5],title:alum[7],bootcamp_id: id)

end

