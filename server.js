const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Replace these with your RDS database details
const db = mysql.createConnection({
  host: 'your-db-host',
  user: 'your-db-username',
  password: 'your-db-password',
  database: 'your-db-name',
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
  } else {
    console.log('Connected to the database');
  }
});

// Handle signup form submission
app.post('/signup', (req, res) => {
  const { name, email, phone, username, password } = req.body;

  // Insert user data into the database
  const sql = 'INSERT INTO users (name, email, phone, username, password) VALUES (?, ?, ?, ?, ?)';
  db.query(sql, [name, email, phone, username, password], (err, result) => {
    if (err) {
      console.error('Error inserting user data:', err);
      res.status(500).send('Internal Server Error');
    } else {
      console.log('User data inserted successfully');
      res.redirect('/login.html'); // Redirect to login page
    }
  });
});

// Handle login form submission
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Check user credentials in the database
  const sql = 'SELECT * FROM users WHERE username = ? AND password = ?';
  db.query(sql, [username, password], (err, result) => {
    if (err) {
      console.error('Error checking user credentials:', err);
      res.status(500).send('Internal Server Error');
    } else {
      if (result.length > 0) {
        console.log('User authenticated successfully');
        res.redirect('/homePage.html'); // Redirect to home page
      } else {
        console.log('Invalid username or password');
        res.status(401).send('Unauthorized');
      }
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
