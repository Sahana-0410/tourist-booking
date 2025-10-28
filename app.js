// Import mysql2
const mysql = require('mysql2');

// Create a connection to the database
const connection = mysql.createConnection({
  host: 'localhost',       // Database host
  user: 'root',            // Your MySQL username
  password: 'Saha@2005', // Replace with your MySQL password
  database: 'testdb'       // Replace with your database name
});

// Connect to MySQL
connection.connect((err) => {
  if (err) {
    console.error('❌ Error connecting: ' + err.stack);
    return;
  }
  console.log('✅ Connected as id ' + connection.threadId);
});

// Example query
connection.query('SELECT 1 + 1 AS solution', (err, results) => {
  if (err) throw err;
  console.log('The solution is: ', results[0].solution);
});

// Close connection
connection.end();
