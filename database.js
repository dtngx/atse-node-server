var sqlite3 = require('sqlite3').verbose()

// Create the database
let db = new sqlite3.Database('oddjob.db', (err) => {
    if (err) {
      console.error(err.message);
      throw err
    }
    console.log('Connected to the OddJob User database.');
  });


  // create table 'book'
  var sql='CREATE TABLE users(id INT, username TEXT, password TEXT, firstName TEXT, lastName TEXT)';
  db.run(sql, (err) => {
    if (err) {
        // Table already created
        console.log('User Table already created.');
    }else{
      console.log('User Table created.');
      
      // If the created table is empty, create some Rows

      var insert = 'INSERT INTO users(id, username, password, firstName, lastName) VALUES(?, ?, ?, ?, ?)';
      db.run(insert, [1, "student", "student", "Studenting", "Student"]);
      db.run(insert, [2, "provider", "provider", "Providing", "Provider"]);

      console.log("Default user rows inserted.")
    }
  });

  // create table 'book'
  sql='CREATE TABLE jobs(id INT, jobName TEXT, jobDescription TEXT, creationDate TEXT, startDate TEXT, dueDate TEXT, location TEXT, createdByUserId INT)';
  db.run(sql, (err) => {
    if (err) {
        // Table already created
        console.log('Job Table already created.');
    }else{
      console.log('Job Table created.');
      
      // If the created table is empty, create some Rows

      var insert = 'INSERT INTO jobs(id, jobName, jobDescription, creationDate, startDate, dueDate, location, createdByUserId) VALUES(?, ?, ?, ?, ?, ?, ?, ?)';
      db.run(insert, [1, "Lawn Mowing", "Mow 8000sqm of lawn in a neighbourhood garden", "12-05-2021", "21-05-2021", "21-05-2021", "Ealing", 2]);
      db.run(insert, [2, "Doing the Dishes", "Clean 5342 dishes.", "12-05-2021", "28-05-2021", "29-05-2021", "St. Marys Rd", 2]);

      console.log("Default job rows inserted.")
    }
  });

// export as module, called db
module.exports = db
