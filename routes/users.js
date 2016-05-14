var express = require('express');
var router = express.Router();
var userDal = require('../model/user_dal');
var stateDal = require('../model/state_dal');

router.get('/all', function(req, res) {
  userDal.GetAll(function (err, result) {
        if (err) throw err;
        res.render('displayAllUsers.ejs', {rs: result});
      }
  );
});

router.get('/create', function(req, res, next) {
    stateDal.GetAll(function(err, result) {
        if (err) throw err;
        res.render('userFormCreate.ejs', {states: result});
    });
});

router.get('/save', function(req, res, next) {
    userDal.Insert(req.query, function(err, result){
        if (err) {
            res.send(err);
        }
        else {
            res.send("Successfully saved the user.");
        }
    });
});


router.get('/', function (req, res) {
  userDal.GetUserRatingsByID(req.query.user_id, function (err, result) {
        console.log(req.query.user_id);
        if (err) throw err;
        res.render('displayUserInfo.ejs', {rs: result, user_id: req.query.user_id});
      }
  );
});

router.get('/delete', function(req, res) {
    console.log(req.query);
    userDal.GetUserDataByID(req.query.user_id, function(err, result) {
        if(err){
            res.send("Error: " + err);
        }
        else if(result.length != 0) {
            userDal.DeleteById(req.query.user_id, function (err) {
                res.send(result[0].first_name + ' Successfully Deleted');
            });
        }
        else {
            res.send('User does not exist in the database.');
        }
    });
});

router.get('/edit', function(req, res) {
    console.log('/edit user_id:' + req.query.user_id);

    userDal.GetUserDataByID(req.query.user_id, function(err, user_result){
        if(err) {
            console.log(err);
            res.send('error: ' + err);
        }
        else {
            console.log("rs:", user_result);
            stateDal.GetAll(function(err, state_result){
                console.log("states:", state_result);
                res.render('user_edit_form', {rs: user_result, states: state_result, message: req.query.message});
            });
        }
    });
});

router.post('/update', function(req, res) {
    console.log(req.body);
    userDal.Update(req.body.user_id, req.body.firstname, req.body.lastname, req.body.email, req.body.password, req.body.state_id,
        function(err){
            var message;
            if(err) {
                console.log(err);
                message = 'error: ' + err.message;
            }
            else {
                message = 'success';
                res.redirect('/users/edit?user_id=' + req.body.user_id + '&message=' + message);
            }
        });
});

module.exports = router;
