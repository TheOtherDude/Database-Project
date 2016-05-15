addWorkoutAjax = function () {
    var payload = {
        exercise: $('#exercise').val(),
        sets: $('#sets').val(),
        reps: $('#reps').val(),
        extra_weight: $('#extra_weight').val()
    };

    // Next we configure the jQuery ajax call
    $.post('/user/addWorkout', payload, function (data) {
        console.log("Response: ", data);
        if (typeof data === "object") {
            $('#message').html('Hmm, technical difficulties...');
        }
        else {
            window.location.replace('/user/');
        }
    });
}


$(document).ready(function () {
    $('#submitBtn').click(function (e) {
        e.preventDefault();
        addWorkoutAjax();
    })

});