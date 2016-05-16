# Database-Project

### Design
* I removed the "Muscle Groups" multi-valued attribute from my ER diagram and relation schema because I didn't need them for the web app.
* Functional dependency diagrama is in ERD+.docx along with the ER diagram and relational schema

### The Web App
* About page is accessible from the side bar
* Login and Signup are available in the upper-right corner if not already logged on
* Several minor bootstrap features are used. The layout of the site uses the responsive row/column grid, the forms use bootstrap, and the buttons are all bootstrap.

### Web App/Database Interaction
* The most extravagent forms are for signing up and adding a workout.
* Dropdowns are used to select your exercise and your gender
* All four tables are used (users, friends, exercises, workouts)
* The pages refresh/redirect on successful form submission and display an error message on failure.
* Unfortunately, none of my forms really input data to multiple tables at once

### The Database
* I used several procedures instead of a view because I wanted to be able to pass in parameters.
* The Hall of Fame page displays data from a query with a HAVING clause specified by user input.
* The query that displays your friends' most recent workouts uses a subquery.
