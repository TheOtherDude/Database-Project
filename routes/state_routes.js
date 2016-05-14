var express = require('express');
var router = express.Router();
var stateDal = require('../model/state_dal');

router.get('/new', function(err, res, next) {
    res.render('state_insert_form');
});

router.get('/state_insert', function(req, res){
    stateDal.Insert(req.query.state_name, function(err, result){
        var response = {};
        if(err) {
            response.message = err.message;
        }
        else {
            response.message = 'Success!';
        }
        res.json(response);
    });
});

module.exports = router;