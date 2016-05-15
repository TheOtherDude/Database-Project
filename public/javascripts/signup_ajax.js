/**
 * Created by student on 5/2/16.
 */

signupAjax = function() {
    var payload = {
        username: $('#username').val(),
        email: $('#email').val(),
        birtdate: $("#birthdate").val(),
        gender: $("#gender").val(),
        password: $('#password').val()
    };

    // Next we configure the jQuery ajax call
    $.post('/signup', payload, function(data) {
        if (typeof data === "object") {
            $('#message').html('Hmm, technical difficulties...');
        } else {
            window.location.replace('/');
        }
    });
}


$(document).ready(function() {
    $('#signupBtn').click(function(e) {
        e.preventDefault();
        signupAjax();
    })

    $(function() {
        $( "#birthdate" ).datepicker();
    });

});
