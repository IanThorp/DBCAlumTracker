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

			#REFACTOR OPPORTUNITY - Full-text indexing --- check out elasticsearch

			search.each do |item|
				@alums << Alum.where("name ILIKE ? OR company ILIKE ? OR city ILIKE ? OR state ILIKE ? OR title ILIKE ? OR bootcamp ILIKE ?", "%#{item}%", "%#{item}%", "%#{item}%", "%#{item}%", "%#{item}%", "%#{item}%")
			end

			@alums.flatten!
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

get '/admin' do

	if request.xhr?
		pw = params["password"]

		if pw == ENV['admin_pw']
			check = "yes"
			session[:admin] = check
		else
			check = "no"
		end

		send = {admin_check: check}
		content_type :json
    	send.to_json

	end

end

get '/signout' do

	if session[:admin]
		session.delete(:admin)
	end

	redirect '/'

end

