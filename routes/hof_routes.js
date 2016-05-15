var express = require('express');
var router = express.Router();
var workoutDal = require('../model/workout_dal');

router.get('/hall', function(req, res) {
    var threshold = req.query.threshold ? req.query.threshold : 100;
    workoutDal.PushupsOverX(threshold, function(err, result) {
        if (err) {
            console.log(err);
            res.send(err);
        }
        else {
            res.render('hof/hall.ejs', {
                firstname: req.session.account.username,
                hof: result,
                threshold: threshold
            });
        }
    })
})

module.exports = router;