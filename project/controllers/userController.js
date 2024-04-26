// userController.js
const pool = require('../db');

exports.createUser = (req, res) => {
  const { username, password, email } = req.body;
  console.log(`username- ${username} pass - ${password} email - ${email}`)
  pool.query('INSERT INTO users (username, password, email) VALUES (?, ?, ?)', [username, password, email], (error, results) => {
    if (error){ 
    console.log(`error -${error}`)
    throw error;}
    res.json({ message: 'User added successfully' });
  });
};

exports.loginUser = (req, res) => {
  const { username, password } = req.body;
  console.log(`username - ${username} password- ${password}`)
  pool.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], (error, results) => {
    if (error) throw error;

    if (results.length > 0) {
      // User found, login successful
      res.json({ message: 'Login successful', user: results[0] });
    } else {
      // User not found or credentials incorrect
      res.status(401).json({ message: 'Invalid username or password' });
    }
  });
};


exports.getAllUsers = (req, res) => {
  pool.query('SELECT id, username FROM users', (error, results) => {
    if (error) throw error;
    console.log(`result get userList- ${JSON.stringify(results)}`)
    res.json(results);
  });
};