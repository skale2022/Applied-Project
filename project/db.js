const mysql = require('mysql');

const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'todolist.ctkqqkkmwl79.us-east-2.rds.amazonaws.com',
  user: 'admin',
  password: 'Bing_2905!',
  database: 'todo_db'
});

// Attempt to connect to the database
pool.getConnection((error, connection) => {
  if (error) {
    console.error('Error connecting to database:', error);
  } else {
    console.log('Connected to the database!');
    connection.release();
  }
});

module.exports = pool;