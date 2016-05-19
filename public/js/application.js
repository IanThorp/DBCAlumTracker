$(function () {

    $('.alum-list').hide();
    $('.admin-logout-double').hide();

    // Search

    $('a[href="#search"]').on('click', function(event) {
        event.preventDefault();
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
                    $('.alum-list').html("<div class='empty'><p>We could not find anyone that matched your search term(s)</p></div>");
                }
            })

        
    })

    // Admin login

    $('a[href="#signin"]').on('click', function(event) {
        event.preventDefault();
        $('#signin').addClass('open');
        $('#signin > form > input[type="search"]').focus();
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
                    $('.admin-checker').html("<div class='admin-success'><p>You've successfully logged in.</p></div>");
                    $('.admin-checker').show()
                    $('.admin-access').hide()
                    $('.admin-logout').show()
                    $('.admin-logout-double').show()
                }else{
                    $('.admin-checker').html("<div class='admin-failure'><p>You've entered an incorrect password.</p></div>");
                }
                
            })

        
    })


});
