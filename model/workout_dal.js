var mysql = require('mysql');
var db = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.GetAllExercises = function (callback) {
    var query = "SELECT * FROM exercises;";
    connection.query(query, function (err, result) {
        if (err) {
            console.log(this.sql);
            callback(err, null);
        }
        else {
            callback(null, result);
        }
    });
}

exports.GetWorkoutsByAccountId = function (userId, callback) {
    var query = "SELECT e.name, time, sets, reps, extra_weight " +
        'FROM workouts w ' +
        'JOIN exercises e ' +
        'ON w.exercise_id = e.exercise_id ' +
        'WHERE w.user_id = ? ' +
        'ORDER BY time DESC; ';
    var query_data = [userId];

    connection.query(query, query_data, function (err, result) {
        if (err) {
            console.log(this.sql);
            callback(err, null);
        }
        else {
            callback(null, result);
        }
    });
};

exports.GetWorkoutsByUsername = function (username, callback) {
    var query = "SELECT e.name, time, sets, reps, extra_weight " +
        'FROM workouts w ' +
        'JOIN exercises e ' +
        'ON w.exercise_id = e.exercise_id ' +
        'JOIN users u ' +
        'ON w.user_id = u.user_id ' +
        'WHERE u.username = ? ' +
        'ORDER BY time DESC; ';
    var query_data = [username];

    connection.query(query, query_data, function (err, result) {
        if (err) {
            console.log(this.sql);
            callback(err, null);
        }
        else {
            callback(null, result);
        }
    });
};

var GetExerciseIdByName = function (name, callback) {
    var query = "SELECT exercise_id FROM exercises WHERE name = ?;"
    connection.query(query, [name], function (err, result) {
        if (err) {
            console.log(this.sql);
            callback(err, null);
        }
        else {
            callback(null, result);
        }
    });
};

exports.GetExerciseIdByName = GetExerciseIdByName;

exports.AddWorkout = function (data, callback) {
    GetExerciseIdByName(data.exercise, function (err, exerciseId) {
        var query = "INSERT INTO workouts (user_id, exercise_id, time, sets, reps, extra_weight) VALUES (?, ?, NOW(), ?, ?, ?)";
        var query_data = [data.user_id, exerciseId[0].exercise_id, data.sets, data.reps, data.extra_weight];

        connection.query(query, query_data, function (err, result) {
            if (err) {
                console.log(this.sql);
                callback(err, null);
            }
            else {
                callback(null, result);
            }
        });
    });
};


exports.PushupsOverX = function (threshold, callback) {
    var query = "CALL PushupsOverX(?);";
    var query_data = [threshold];
    
    connection.query(query, query_data, function(err, result) {
        if (err) {
            console.log(this.sql);
            callback(err, null);
        }
        else {
            callback(null, result[0]);
        }
    });
};


exports.FriendsOfIdWorkouts = function(userId, rowLimit, callback) {
    var query = "CALL FriendsOfIdWorkouts(?, ?);";
    var query_data = [userId, rowLimit];

    connection.query(query, query_data, function(err, result) {
        if (err) {
            console.log(this.sql);
            callback(err, null);
        }
        else {
            callback(null, result[0]);
        }
    });
}
