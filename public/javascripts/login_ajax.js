/**
 * Created by student on 5/2/16.
 */

loginAjax = function () {
    var payload = {
        username: $('#username').val(),
        password: $('#password').val()
    };

    // Next we configure the jQuery ajax call
    $.post('/authenticate', payload, function (data) {
        console.log("Response: ", data);
        if (data === "error") {
            $('#message').html('Hmm, technical difficulties...');
        }
        else if (data === "Account not found.") {
            $('#message').html('Oh snap! Your password is wrong!');
            $('#password').empty();
            $('#username').empty();
        }
        else if (data === ""){
            window.location.replace('/');
        }
        else {
            window.location.replace(data);
        }
    });
}


$(document).ready(function () {
    $('#loginBtn').click(function (e) {
        e.preventDefault();
        loginAjax();
    })

});
