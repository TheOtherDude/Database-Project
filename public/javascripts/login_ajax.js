/**
 * Created by student on 5/2/16.
 */

loginAjax = function() {
    var payload = {
        email: $('#email').val(),
        password: $('#password').val()
    };

    // Next we configure the jQuery ajax call
    $.post('/authenticate', payload, function(data) {
            console.log(data);
            console.log(payload);
            window.location.replace('/');
        });
}


$(document).ready(function() {
    $('#loginBtn').click(function(e) {
        e.preventDefault();
        loginAjax();
    })

});
