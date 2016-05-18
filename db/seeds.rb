require 'csv'

alums = []

CSV.foreach("db/gsheet18052016.csv") do |row|
  alums << row
end

alums.each do |alum|

	Alum.create(name:alum[0],company:alum[1],compurl:alum[2],city:alum[3],state:alum[4],linkurl:alum[5],title:alum[7],bootcamp: alum[6])

end

