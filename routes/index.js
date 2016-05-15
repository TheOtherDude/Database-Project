var express = require('express');
var router = express.Router();
var userDal = require('../model/user_dal');

/* GET home page. */
router.get('/', function(req, res, next) {
  var data = {};
  if(req.session.account === undefined) {
    res.render('index', data);
  }
  else {
    data.firstname = req.session.account.username;
    res.render('index', data);
  }
});


/* GET login page */
router.get('/login', function(req, res) {
  res.render('authentication/login.ejs');
});


/* GET signup page */
router.get('/signup', function(req, res) {
  res.render('authentication/signup.ejs');
});


/* POST new user data */
router.post('/signup', function(req, res) {
  userDal.Insert(req.body, function(err, result){
    if (err) {
      res.send(err);
    }
    else {
      userDal.GetAccount(req.body.username, req.body.password, function (err, account) {
        if (err) {
          res.send(err);
          console.log("error");
        }
        else if (account == null) {
          res.send("Account not found.");
        }
        else {
          req.session.account = account;
          res.send("Welcome");
        }
      });
    }
  });
})

/* GET logout page */
router.get('/logout', function(req, res) {
  req.session.destroy( function(err) {
    res.render('authentication/logout.ejs');
  });
});


/* GET about page */
router.get('/about', function (req, res, next) {
  var data = {};
  if (req.session.account) {
    data.firstname = req.session.account.username;
  }
  res.render('about.ejs', data);
});

/* Authenticate user */
router.post('/authenticate', function (req, res, next) {
    userDal.GetAccount(req.body.username, req.body.password, function(err, account) {
      if (err) {
        res.send("error");
      }
      else if (account == null) {
        res.send("Account not found.");
      }
      else {
        req.session.account = account;
        res.send(req.session.originalUrl);
      }
    })
});


module.exports = router;
