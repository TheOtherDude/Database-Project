use pplummer;

SELECT * FROM user;

DROP PROCEDURE IF EXISTS Get_Account;
DELIMITER //

CREATE PROCEDURE Get_Account(_username VARCHAR(50), _password VARCHAR(50))
BEGIN
	SELECT username, user_id, email, birthdate, gender 
    FROM users 
    where username=_username and password=_password;
END //
DELIMITER ;

CALL Get_Account("theotherdude", "passw0rd");

SELECT e.name, time, sets, reps, extra_weight
FROM workouts w 
JOIN exercises e 
ON w.exercise_id = e.exercise_id
WHERE w.user_id = 1
ORDER BY time DESC;

SELECT * FROM exercises;

SELECT * FROM workouts;

SELECT exercise_id FROM exercises WHERE name = 'crunches';

SELECT * FROM friends WHERE user_id = 1;

DROP PROCEDURE IF EXISTS PushupsOverX;
DELIMITER //

CREATE PROCEDURE PushupsOverX(_X INT)
BEGIN
	SELECT u.username, SUM(w.reps * w.sets) AS 'LifetimePushups'
	FROM users u
	JOIN workouts w
	ON u.user_id = w.user_id
	WHERE exercise_id = 3 OR exercise_id = 4 OR exercise_id = 5
	GROUP BY u.username
	HAVING  SUM(w.reps * w.sets) > _X
    ORDER BY SUM(w.reps * w.sets) DESC;
END //
DELIMITER ;

CALL PushupsOverX(100);

SELECT u.username AS Username, SUM(w.reps * w.sets) AS 'LifetimePushups'
FROM users u
JOIN workouts w
ON u.user_id = w.user_id
WHERE exercise_id = 3 OR exercise_id = 4 OR exercise_id = 5
GROUP BY u.username
HAVING  SUM(w.reps * w.sets) > 200
ORDER BY SUM(w.reps * w.sets) DESC;

SELECT e.name, time, sets, reps, extra_weight 
FROM workouts w 
JOIN exercises e 
ON w.exercise_id = e.exercise_id
JOIN users u
ON w.user_id = u.user_id 
WHERE u.username = 'archtelvanni' 
ORDER BY time DESC;

DROP PROCEDURE IF EXISTS FriendsOfIdWorkouts;
DELIMITER //

CREATE PROCEDURE FriendsOfIdWorkouts(_user_id INT, _limit INT)
BEGIN
SELECT u.username, w.time, e.name, w.reps, w.sets, w.extra_weight
FROM  users u 
JOIN workouts w ON u.user_id = w.user_id
JOIN exercises e ON w.exercise_id = e.exercise_id
WHERE EXISTS (
			SELECT f.username
    			FROM friends f
    			WHERE f.username = u.username AND f.user_id = _user_id
   		 )
ORDER BY time DESC
LIMIT _limit;
END //
DELIMITER ;

CALL FriendsOfIdWorkouts(2, 2);


