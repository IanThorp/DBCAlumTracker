$(function () {

    $('.alum-list').hide();

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

    $('form').submit(function(event) {
        event.preventDefault();
        console.log('hi')
        // target body, take background-image and place inside jumbotron
        $('body').css('background-image', 'none')
        $('.jumbotron').css('background-image', 'url(http://i.imgur.com/mXd7o02.png');
        $('#search').removeClass('open');
        $('.alum-list').show();
        
    })
});
