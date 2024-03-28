const mysql = require('mysql');
const pool = require('../db');

// Define your migration logic
const createTableMigration = `
  CREATE TABLE IF NOT EXISTS todos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    task VARCHAR(255) NOT NULL,
    completed BOOLEAN DEFAULT false
  )
`;

// Execute the migration
pool.query(createTableMigration, (error) => {
  if (error) {
    console.error('Error executing migration:', error);
  } else {
    console.log('Migration successful - table created!');
    pool.end(); // Close the connection pool after the migration
  }
});
