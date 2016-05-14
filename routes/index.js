var express = require('express');
var router = express.Router();
var userDal = require('../model/user_dal');
var stateDal = require('../model/state_dal');

/* GET home page. */
router.get('/', function(req, res, next) {
  var data = {
    title: 'CS355',
    subtitle: 'Lab 8'
  }
  if(req.session.account === undefined) {
    res.render('index', data);
  }
  else {
    data.firstname = req.session.account.first_name;
    res.render('index', data);
  }
});

/* GET Template Example */
router.get('/templatelink', function(req, res, next) {
  res.render('templateexample.ejs', { title: 'cs355'});
});

router.post('/authenticate', function(req, res) {
  userDal.GetByEmail(req.body.email, req.body.password, function (err, account) {
    if (err) {
      res.send(err);
      console.log("You got an error");
    }
    else if (account == null) {
      res.send("Account not found.");
    }
    else {
      req.session.account = account;
      res.send("success");
      //res.redirect('/');
    }
  });
});


router.get('/login', function(req, res) {
  res.render('authentication/login.ejs');
});

router.get('/signup', function(req, res) {
  stateDal.GetAll(function(err, result) {
    if (err) throw err;
    res.render('signup.ejs', {states: result});
  });
});

router.post('/signup', function(req, res) {
  userDal.Insert(req.body, function(err, result){
    if (err) {
      res.send(err);
    }
    else {
      userDal.GetByEmail(req.body.email, req.body.password, function (err, account) {
        if (err) {
          res.send(err);
          console.log("You got an error");
        }
        else if (account == null) {
          res.send("Account not found.");
        }
        else {
          req.session.account = account;
          res.send("Welcome");
          //res.redirect('/');
        }
      });
    }
  });
})


router.get('/logout', function(req, res) {
  req.session.destroy( function(err) {
    res.render('authentication/logout.ejs');
  });
});



module.exports = router;
