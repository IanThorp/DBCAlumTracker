get '/' do
	@alums = []

	if request.xhr?
		raw = params["search-term"]
		raw_array = raw.split(" ")
		
		if raw_array.length > 0
			search = raw_array.map {|item|item.downcase}
		end

		if raw.length < 1
			@alums = Alum.all
		else
			all_alums = Alum.all
			
			search.each do |item|

				all_alums.each do |alum|
					@alums << alum if alum.name.downcase.include? item
					@alums << alum if alum.company.downcase.include? item
					@alums << alum if alum.city.downcase.include? item
					@alums << alum if alum.state.downcase.include? item
					@alums << alum if alum.title.downcase.include? item
					@alums << alum if alum.bootcamp.downcase.include? item	
				end

			end
		end

		if @alums.length < 1
			empty = "yes"
		else
			empty = "no"
		end
		
		send = {alumarray: @alums, empty: empty}
		content_type :json
    	send.to_json

    else
		erb :index
  	end

end

