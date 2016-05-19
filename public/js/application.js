$(function () {

    $('.alum-list').hide();
    $('.admin-logout-double').hide();
    $('.add-alum-double').hide();
    $('.add-alum').hide();

    // Search

    $('a[href="#search"]').on('click', function(event) {
        event.preventDefault();
        $('.add-alum').hide();
        $('#search').addClass('open');
        $('#search > form > input[type="search"]').focus();
    });

    $('#search, #search button.close').on('click keyup', function(event) {
        if (event.target == this || event.target.className == 'close' || event.keyCode == 27) {
            $(this).removeClass('open');
        }
    });

    $('.search-form').submit(function(event) {
        event.preventDefault();
        $('.admin-checker').hide()
        // target body, take background-image and place inside jumbotron
        var input = $('.search-form').serializeArray();

        $('body').css('background-image', 'none')
        $('.jumbotron').css('background-image', 'url(http://i.imgur.com/mXd7o02.png');
        $('#search').removeClass('open');
        $('.alum-list').empty();
        $('.alum-list').show();
        $('.delete-error-area').empty()

        var request = $.ajax({
              method: "GET",
              url: '/',
              data: input
            })

            request.done(function(data) {
                var template = $("#alum-diagram").html();

                if (data.empty === "no"){
                    var content = Mustache.render(template, {alumarray: data.alumarray});
                    $('.alum-list').append(content);
                    if(data.admin === "no"){
                        $('.remove-alum').hide();
                    }
                }else{
                    $('.alum-list').html("<div class='alert alert-danger'><p>We could not find anyone that matched your search term(s)</p></div>");
                }
            })


    })

    // Admin login

    $('a[href="#signin"]').on('click', function(event) {
        event.preventDefault();
        $('#signin').addClass('open');
        $('#signin > form > input[type="password"]').focus();
    });

    $('#signin, #signin button.close').on('click keyup', function(event) {
        if (event.target == this || event.target.className == 'close' || event.keyCode == 27) {
            $(this).removeClass('open');
        }
    });

    $('.signin-form').submit(function(event) {
        event.preventDefault();
        // target body, take background-image and place inside jumbotron
        var input = $('.signin-form').serializeArray();

        $('body').css('background-image', 'none')
        $('.jumbotron').css('background-image', 'url(http://i.imgur.com/mXd7o02.png');
        $('#signin').removeClass('open');
        $('.alum-list').empty();

        var request = $.ajax({
              method: "GET",
              url: '/admin',
              data: input
            })

            request.done(function(data) {

                var template = $("#alum-diagram").html();

                if (data.admin_check === "yes"){
                    $('.admin-checker').html("<div class='alert alert-success'><p>You've successfully logged in.</p></div>");
                    $('.admin-checker').show()
                    $('.admin-access').hide()
                    $('.admin-logout').show()
                    $('.add-admin-link').show()
                    $('.admin-logout-double').show()
                    $('.add-alum-double').show()

                }else{
                    $('.admin-checker').html("<div class='alert alert-danger'><p>You've entered an incorrect password.</p></div>");
                }

            })


    })

    // Add Alum

    $('.add-alum-link, .add-alum-double').on('click',function(event){
        event.preventDefault()
        $('body').css('background-image', 'none')
        $('.jumbotron').css('background-image', 'url(http://i.imgur.com/mXd7o02.png');
        $('.admin-checker').hide();
        $('.alum-list').hide();
        $('.add-form').trigger("reset");
        $('.add-alum').show();
    })

    $('.add-form').submit(function(event) {
        event.preventDefault();
        // target body, take background-image and place inside jumbotron
        var input = $('.add-form').serializeArray();

        var request = $.ajax({
              method: "POST",
              url: '/alums/new',
              data: input
            })

            request.done(function(data) {

                $('.add-alum').hide();
                $('.alum-list').empty()
                $('.alum-list').show()

                if(data.name === ""){
                    $('.alum-list').html("<div class='add-error'>You cannot add an alum without admin privileges</div>")
                }else{
                    $('.alum-list').html("<div class='add-new'>"+data.name+" has been added to the alum list!</div>")
                }

            })
    })

    // Remove Alum

    $('body').on('click','.remove-alum',function(event){
        event.preventDefault()

        $('.delete-error-area').empty()

        var parent = $(this).parent().parent()
        var name = parent.children(":first").html()

        var input = {name: name}

        var request = $.ajax({
              method: "DELETE",
              url: '/alums',
              data: input
            })

            request.done(function(data) {

                if(data.name === ""){
                    $('.delete-error-area').html("<div class='del-error'>You cannot delete an alum without admin privileges</div>")
                }else{
                    parent.hide()
                    $('.delete-error-area').html("<div class='del-new'>"+data.name+" has been deleted from the alum list!</div>")
                }

            })





    })



});
