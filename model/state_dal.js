var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.GetAll = function(callback) {
    var qry = "SELECT * from state;"
    connection.query(qry, function(err, result){
        callback(err, result);
    });
}

exports.Insert = function(state_name, callback) {
    var qry = "INSERT INTO state (state) VALUES (?)";
    connection.query(qry, state_name, function(err, result){
        callback(err, result);
    });
};