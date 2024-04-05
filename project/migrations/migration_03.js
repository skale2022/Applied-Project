const pool = require('../db');

// Define your migration logic
const createUsersTableMigration = `
  CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL
  );
`;

// Execute the migration
pool.query(createUsersTableMigration, (error) => {
  if (error) {
    console.error('Error executing migration:', error);
  } else {
    console.log('Migration successful - created users table!');
    pool.end(); // Close the connection pool after the migration
  }
});
