var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.GetAll = function(callback) {
    connection.query('SELECT * FROM movie_info_view;',
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return;
            }
            console.log(result);
            callback(false, result);
        }
    );
}


exports.GetAllTitles = function(callback) {
    connection.query('SELECT movie_id, title FROM movie;',
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return;
            }
            console.log(result);
            callback(false, result);
        }
    );
}


exports.GetByID = function(movie_id, callback) {
     console.log(movie_id);
     var query = 'SELECT * FROM movie_info_view WHERE movie_id=' + movie_id;
     console.log(query);
     connection.query(query,
         function (err, result) {
             if(err) {
                 console.log(err);
                 callback(true);
                 return;
             }
            callback(false, result);
        }
     );
 };


var AddMovieGenres = function(movie_id, genre_ids, callback) {
    if (genre_ids != null) {
        var genre_qry_values = [];

        if (genre_ids instanceof Array) {
            for (var i = 0; i < genre_ids.length; i++) {
                genre_qry_values.push([movie_id, genre_ids[i]]);
            }
        }
        else {
            genre_qry_values.push([movie_id, genre_ids]);
        }

        var genre_qry = 'INSERT INTO genreLookup (movie_id, genre_id) VALUES ?';
        connection.query(genre_qry, [genre_qry_values], function (err) {
            callback(err);
        });
    }
};

exports.Insert = function(title, tagline, genres, callback) {
    var values = [title, tagline];
    connection.query('INSERT INTO movie (title, tagline) VALUES (?, ?)', values,
        function (err, result) {

            if (err == null && genres != null) {
                var genre_qry_values = [];

                if(genres instanceof Array) {
                    for (var i = 0; i < genres.length; i++) {
                        genre_qry_values.push([result.insertId, genres[i]]);
                    }
                }
                else {
                    genre_qry_values.push([result.insertId, genres]);
                }

                console.log(genre_qry_values);

                var genre_qry = 'INSERT INTO genreLookup (movie_id, genre_id) VALUES ?';

                connection.query(genre_qry, [genre_qry_values], function(err, genre_result){
                    if(err) {
                        Delete(result.insertId, function() {
                            callback(err);
                        });
                    }
                    else {
                        callback(err);
                    }
                });
            }
            else {
                callback(err);
            }
        });
}


var DeleteMovieGenres = function(movie_id, callback) {
    var genre_qry = 'DELETE FROM genreLookup WHERE movie_id = ?';
    connection.query(genre_qry, movie_id, function (err, result) {
        callback(err, result);
    });
};



exports.Update = function(movie_id, title, tagline, genre_ids, callback) {
    console.log(movie_id, title, tagline, genre_ids);
    var values = [title, tagline, movie_id];

    connection.query('UPDATE movie SET title = ?, tagline = ? WHERE movie_id = ?', values,
        function(err, result){
            if(err) {
                console.log(this.sql);
                callback(err, null);
            }
            else {
                // delete all the existing genres for the movie first
                DeleteMovieGenres(movie_id, function(err, result) {
                    //then add them back in.
                    AddMovieGenres(movie_id, genre_ids, callback);
                });
            }
        });
}

var Delete = function(movie_id, callback) {
    var qry = 'DELETE FROM movie WHERE movie_id = ?';
    connection.query(qry, [movie_id],
        function (err) {
            callback(err);
        });
};

exports.AddRating = function(rating, user_id, movie_id, callback) {
    var qry = "CALL Add_Rating (?, ?, ?)";
    var qry_data = [rating, user_id, movie_id];
    
    connection.query(qry, qry_data, function(err, result) {
        if (err) {
            callback(err, null);
        }
        else {
            callback(null, result);
        }
    })
}

exports.UpdateRating = function(rating, user_id, movie_id, callback) {
    var qry = "CALL Update_Rating (?, ?, ?)";
    var qry_data = [rating, user_id, movie_id];

    connection.query(qry, qry_data, function(err, result) {
        if (err) {
            callback(err, null);
        }
        else {
            callback(null, result);
        }
    })
}

exports.GetRatingByIds = function (movie_id, user_id, callback) {
    var qry = "CALL Get_Rating_With_IDs (?, ?);";
    var qry_data = [movie_id, user_id];

    connection.query(qry, qry_data, function(err, result) {
        if (err) {
            callback(err, null);
        }
        else {
            callback(null, result[0][0]);
        }
    });
}

exports.DeleteById = Delete;
