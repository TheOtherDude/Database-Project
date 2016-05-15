/**
 * Created by Phillip on 3/28/2016.
 */
var mysql = require('mysql');
var db = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.Insert = function (user, callback) {
    
    console.log(user);
    
    var dynamic_query = 'INSERT INTO users (username, email, birthdate, gender, password) VALUES (?, ?, ?, ?, ?)';
    var userData = [user.username, user.email, user.birthdate, user.gender, user.password];
    console.log("test");
    console.log(dynamic_query);


    // connection.query(query, is where the SQL string we built above is actually sent to the MySQL server to be run
    connection.query(dynamic_query, userData, function (err, result) {
        
            if (err) {
                console.log(err);
                callback(true);
                return;
            }
        
            callback(false, result);
        }
    );
}


exports.GetAccount = function (username, password, callback) {
    var query = 'CALL Get_Account(?, ?)';
    var query_data = [username, password];

    connection.query(query, query_data, function (err, result) {
        if (err) {
            callback(err, null);
        }
        /* NOTE: Stored Procedure results are wrapped in an extra array
         /* and only one user record should be returned,
         // so return only the one result*/
        else if (result[0].length == 1) {
            callback(err, result[0][0]);
        }
        else {
            callback(err, null);
        }
    });
}

exports.GetFriendsOfId = function (userId, callback) {
    var query = "SELECT username FROM friends WHERE user_id = ?;";
    var query_data = [userId];

    connection.query(query, query_data, function (err, result) {
        if (err) {
            callback(err, null);
        }
        else {
            callback(null, result);
        }
    });
}

exports.AddAFriend = function(userId, friendUserName, callback) {
    var query = "INSERT INTO friends (user_id, username) VALUES (?, ?);";
    var query_data = [userId, friendUserName];

    connection.query(query, query_data, function (err, result) {
        if (err) {
            callback(err, null);
        }
        else {
            callback(null, result);
        }
    });

};


exports.RemoveAFriend = function(userId, friendUserName, callback) {
    var query = "DELETE FROM friends WHERE user_id = ? AND username = ?";
    var query_data = [userId, friendUserName];

    connection.query(query, query_data, function (err, result) {
        if (err) {
            callback(err, null);
        }
        else {
            callback(null, result);
        }
    });
}