/**
 * Created by Phillip on 3/28/2016.
 */
var mysql = require('mysql');
var db = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.GetAll = function (callback) {
    connection.query('SELECT first_name, last_name, user_id FROM user;',
        function (err, result) {
            if (err) {
                console.log(err);
                callback(true);
                return;
            }
            console.log(result);
            callback(false, result);
        }
    );
}


exports.GetUserRatingsByID = function (user_id, callback) {
    console.log(user_id);
    var query = 'SELECT * FROM user_info_view WHERE user_id=' + user_id;
    console.log(query);
    connection.query(query,
        function (err, result) {
            if (err) {
                console.log(err);
                callback(true);
                return;
            }
            callback(false, result);
        }
    );
}

exports.GetUserDataByID = function (user_id, callback) {
    console.log(user_id);
    var query = 'SELECT * FROM user WHERE user_id=' + user_id;
    console.log(query);
    connection.query(query,
        function (err, result) {
            if (err) {
                console.log(err);
                callback(true);
                return;
            }
            callback(false, result);
        }
    );
}


/* NOTE: Just like functions in other languages the parameters sent to a function do not need to have the same names
 as the function definition. In this case, I'm sending the "req" parameter from the router to exports.Insert(),
 but exports.Insert() has defined this input parameter as "account_info"

 the callback parameter is an anonymous function passed like a parameter, that will be run later on within
 this function.
 */
exports.Insert = function (user, callback) {
    /* this console.log() will print out the account information that the function receives.  this is useful
     to see if the information I think i'm sending to this function is really being received.
     */
    console.log(user);

    /* we are dynamically building a sql string using string concatenation.  We'll see other ways to do this soon.
     NOTE: each value in this example is a string.  And in SQL we have to wrap strings in quotes. If they were integer values
     then we would not need to have them wrapped in quotes; i.e. + '\'' + the_value + '\''
     NOTE 2: My account table has auto incrementing IDs, but I do not submit values for them.
     */
    var dynamic_query = 'INSERT INTO user (first_name, last_name, email, password, state_id) VALUES (' +
        '\'' + user.firstname + '\', ' +
        '\'' + user.lastname + '\', ' +
        '\'' + user.email + '\', ' +
        '\'' + user.password + '\', ' +
        '\'' + user.state_id + '\'' +
        ');';

    /* this console.log() will print out the query I'm about to send to the MySQL server via the connection.query() method.
     this log message can be copied and pasted into MySQL workbench to see if there are any SQL syntax errors.
     */
    console.log("test");
    console.log(dynamic_query);

    // connection.query(query, is where the SQL string we built above is actually sent to the MySQL server to be run
    connection.query(dynamic_query,
        /* we are passing this function as an input variable to connection.query().  MySQL will run the query
         and send back the records you are used to seeing in MySQL workbench as an array of JavaScript objects.
         This is also referred to as a result set or record set.

         After that is complete it will execute the function() we are defining below.  If we pass in a function with
         two arguments, in this case we have named them err (or error) and result, the connection.query() function
         will populate the first argument with any errors that were returned by the MySQL server and it will
         populate the second argument with the result set array.
         */
        function (err, result) {

            // if the err parameter isn't null or 0, then it will run the code within the if statement
            if (err) {
                /* this section of code prints out the error to the console and then runs the function that was
                 passed to exports.Insert().
                 */
                console.log(err);
                callback(true);
                return;
            }

            /* if there were no errors, it runs the function that was passed to exports.Insert() with the arguments
             false (for no errors) and the result set.  The actual function that is being run was defined by the
             section of code that called exports.Insert() to begin with.
             */

            callback(false, result);
        }
    );
}

exports.DeleteById = function (user_id, callback) {
    var qry = 'DELETE FROM user WHERE user_id = ?';
    connection.query(qry, [user_id],
        function (err) {
            callback(err);
        });
}


exports.Update = function (user_id, first_name, last_name, email, password, state_id, callback) {
    var values = [first_name, last_name, email, password, state_id, user_id];
    console.log("Values:", values);
    connection.query('UPDATE user SET first_name = ?, last_name = ?, email = ?, password= ?, state_id = ? WHERE user_id = ?', values,
        function (err, result) {
            if (err) {
                console.log(this.sql);
                callback(err, null);
            }
            else {
                callback(null, result);
            }
        });
}


exports.GetByEmail = function (email, password, callback) {
    var query = 'CALL Account_GetByEmail(?, ?)';
    var query_data = [email, password];

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