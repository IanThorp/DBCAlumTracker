get '/' do
	@alums = Alum.all
	erb :index
end

