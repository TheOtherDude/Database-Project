rateAjax = function() {
    var payload = {
        rating: $('#rating').val(),
        user_id: $('#user_id').val(),
        movie_id: $('#movie_id').val(),
        new: $('#new').val()
    };

    // Next we configure the jQuery ajax call
    $.post('/movie/sendRating', payload, function(data) {
        console.log(data);
        console.log(payload);
        window.location.replace('/movie/all');
    });
}


$(document).ready(function() {
    $('#rateBtn').click(function(e) {
        e.preventDefault();
        rateAjax();
    })

});