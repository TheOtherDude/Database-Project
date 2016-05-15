/**
 * Created by Phillip on 5/15/2016.
 */
var lifeTimePushups = function() {
    window.location.replace('/hof/hall?threshold=' + $('#threshold').val());
}



$(document).ready(function () {
    $('#setThreshold').click(function(e) {
        e.preventDefault();
        lifeTimePushups();
    })
});