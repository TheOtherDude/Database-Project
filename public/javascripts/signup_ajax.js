/**
 * Created by student on 5/2/16.
 */

signupAjax = function() {
    var payload = {
        email: $('#email').val(),
        password: $('#password').val(),
        firstname: $('#firstname').val(),
        lastname: $('#lastname').val(),
        state_id: parseInt($('#state').val()) + 1
    };

    // Next we configure the jQuery ajax call
    $.post('/signup', payload, function(data) {
        console.log(data);
        console.log(payload);
        window.location.replace('/');
    });
}


$(document).ready(function() {
    $('#signupBtn').click(function(e) {
        e.preventDefault();
        signupAjax();
    })

});
