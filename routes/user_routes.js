var express = require('express');
var router = express.Router();
var workoutDal = require('../model/workout_dal');
var userDal = require('../model/user_dal');


router.get('/', function(req, res) {
    if (!req.query.username) {
        workoutDal.GetWorkoutsByAccountId(req.session.account.user_id, function (err, workouts) {
            if (err) {
                console.log(err);
                res.send(err);
            }
            else {
                res.render('user/workouts', {firstname: req.session.account.username, workouts: workouts, friends: false});
            }
        });
    }
    else {
        workoutDal.GetWorkoutsByUsername(req.query.username, function(err, workouts) {
            if (err) {
                console.log(err);
                res.send(err);
            }
            else {
                res.render('user/workouts', {firstname: req.session.account.username, workouts: workouts, friends: true});
            }
        })
    }
});


router.get('/addWorkout', function(req, res) {
    var data = {};
    data.firstname = req.session.account.username;
    workoutDal.GetAllExercises(function(err, exercises) {
        if (err) {
            console.log(err);
            res.send(err);
        }
        else {
            res.render('user/addWorkout', {firstname: req.session.account.username, exercises: exercises});
        }
    })
});


router.post('/addWorkout', function(req, res) {
    req.body.user_id = req.session.account.user_id;
    workoutDal.AddWorkout(req.body, function(err, result) {
        if (err) {
            console.log(err);
            res.send(err);
        }
        else {
            res.send("Workout successfully added");
        }
    })
})



router.get('/friends', function(req, res) {
    userDal.GetFriendsOfId(req.session.account.user_id, function(err, result) {
        if (err) {
            console.log(err);
            res.send(err);
        }
        else {
            workoutDal.FriendsOfIdWorkouts(req.session.account.user_id, 5, function(err, workouts) {
                if (err) {
                    console.log(err);
                    res.send(err);
                }
                else {
                    res.render('user/friends', {
                        firstname: req.session.account.username,
                        friends: result,
                        workouts: workouts
                    });
                }
            });
        }
    });
});


router.post('/removeFriend', function(req, res) {
    userDal.RemoveAFriend(req.session.account.user_id, req.body.username, function(err, result) {
        if (err) {
            console.log(err);
            res.send(err);
        }
        else {
            res.send(req.body.username + " successfully removed");
        }
    })
});

router.post('/addFriend', function(req, res) {
    userDal.AddAFriend(req.session.account.user_id, req.body.username, function(err, result) {
        if (err) {
            console.log(err);
            res.send(err);
        }
        else {
            res.send(req.body.username + " successfully added");
        }
    });
});


module.exports = router;
