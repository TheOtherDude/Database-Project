/**
 * Created by Phillip on 5/15/2016.
 */
removeFriendAjax = function (e) {
    var payload = {
        username: e.currentTarget.value
    };

    // Next we configure the jQuery ajax call
    $.post('/user/removeFriend', payload, function (data) {
        console.log("Response: ", data);
        if (typeof data === "object") {
            $('#message').html('Hmm, technical difficulties...');
        }
        else {
            window.location.replace('/user/friends');
        }
    });
}

addFriendAjax = function() {
    var payload = {
        username: $('#friendName').val()
    };

    $.post('/user/addFriend', payload, function (data) {
        console.log("Response: ", data);
        if (typeof data === "object") {
            $('#message').html('Username not found.');
        }
        else {
            window.location.replace('/user/friends');
        }
    });
}


$(document).ready(function () {
    $('.btn-danger').click(function (e) {
        e.preventDefault();
        removeFriendAjax(e);
    })
    
    $('#addFriend').click(function(e) {
        e.preventDefault();
        addFriendAjax();
    })
});